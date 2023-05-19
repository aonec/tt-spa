import { combine, createDomain, forward, sample } from 'effector';
import {
  getOrganizationUser,
  getOrganizationUserTasksByRoles,
  postEmloyeeStatus,
} from './changeStatusEmployeeService.api';
import {
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserResponse,
  OrganizationUserWorkingStatusResponse,
  UserStatusResponse,
} from 'myApi';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import {
  EmployeeStatus,
  GetOrganizationUserTasksByRolesRequestParams,
  UserTasksByRoles,
} from './changeStatusEmployeeService.types';
import { getTasksCount } from './changeStatusEmployeeService.utils';
import moment from 'moment';

const domain = createDomain('changeStatusEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCatchEmployeeStatusData = domain.createEvent<{
  id: number;
  status: UserStatusResponse | null;
}>();

const handleUpdateStatus =
  domain.createEvent<AddOrganizationUserWorkingStatusRequest>();

const updateStatus = domain.createEvent();

const updateStatusFx = domain.createEffect<
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse | null,
  EffectFailDataAxiosError
>(postEmloyeeStatus);

const fetchOrganizationUserFx = domain.createEffect<
  number,
  OrganizationUserResponse
>(getOrganizationUser);

const fetchOrganizationUserTasksByRolesFx = domain.createEffect<
  GetOrganizationUserTasksByRolesRequestParams,
  UserTasksByRoles
>(getOrganizationUserTasksByRoles);

const successUpdateStatus = updateStatusFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const $employeeStatus = domain
  .createStore<EmployeeStatus | null>(null)
  .on(handleCatchEmployeeStatusData, (_, data) => data)
  .reset(handleCloseModal);

const $currentUser = domain
  .createStore<OrganizationUserResponse | null>(null)
  .on(fetchOrganizationUserFx.doneData, (_, user) => user)
  .reset(handleCloseModal);

const $organizationUserTasksByRoles = domain
  .createStore<UserTasksByRoles | null>(null)
  .on(fetchOrganizationUserTasksByRolesFx.doneData, (_, data) => data)
  .reset(handleCloseModal);

const $userStatusChangeRequestPayload = domain
  .createStore<AddOrganizationUserWorkingStatusRequest | null>(null)
  .on(handleUpdateStatus, (_, data) => data)
  .reset(handleCloseModal);

const $userTasksByRolesCount = $organizationUserTasksByRoles.map(
  (tasksByRoles) => getTasksCount(tasksByRoles || []),
);

sample({
  clock: handleUpdateStatus,
  source: $currentUser,
  filter: (user): user is OrganizationUserResponse => Boolean(user),
  fn: (user): GetOrganizationUserTasksByRolesRequestParams => {
    return {
      userId: user?.id!,
      roles: user?.roles?.map((elem) => elem.key!)!,
    };
  },
  target: fetchOrganizationUserTasksByRolesFx,
});

sample({
  clock: updateStatus,
  source: $userStatusChangeRequestPayload,
  filter: (payload): payload is AddOrganizationUserWorkingStatusRequest =>
    Boolean(payload),
  fn: (data) => {
    return {
      ...data,
      startDate: moment(data?.startDate)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
      endDate: moment(data?.endDate)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
    };
  },
  target: updateStatusFx,
});

updateStatusFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

forward({
  from: successUpdateStatus,
  to: handleCloseModal,
});

successUpdateStatus.watch(() => message.success('Статус изменен!'));

sample({
  source: $employeeStatus,
  filter: (data): data is EmployeeStatus => Boolean(data),
  fn: (data) => data?.id!,
  target: fetchOrganizationUserFx,
});

const $isLoading = combine(
  updateStatusFx.pending,
  fetchOrganizationUserTasksByRolesFx.pending,
  (...loadings) => loadings.some(Boolean),
);

export const changeStatusEmployeeService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleUpdateStatus,
    handleCatchEmployeeStatusData,
    successUpdateStatus,
  },
  outputs: {
    $isModalOpen,
    $employeeStatus,
    $isLoading,
    $organizationUserTasksByRoles,
    $userTasksByRolesCount,
    $currentUser,
  },
};
