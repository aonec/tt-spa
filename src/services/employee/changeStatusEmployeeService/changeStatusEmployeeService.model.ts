import { combine, createDomain, forward, sample, split } from 'effector';
import {
  getOrganizationUser,
  getOrganizationUserTasksByRoles,
  getOrganizationUsersByRolesList,
  postEmloyeeStatus,
} from './changeStatusEmployeeService.api';
import {
  AddOrganizationUserWorkingStatusRequest,
  ESecuredIdentityRoleName,
  OrganizationUserResponse,
  OrganizationUserWorkingStatusResponse,
  UserStatusResponse,
} from 'myApi';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import {
  EmployeeStatus,
  GetOrganizationUserTasksByRolesRequestParams,
  OrganizationUsersByRolesList,
  UserTasksByRoles,
} from './changeStatusEmployeeService.types';
import {
  getTasksCount,
  isNeedTransferTasks,
  prepareUpdateStatusPayload,
} from './changeStatusEmployeeService.utils';

const domain = createDomain('changeStatusEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const openTransferTasksModal = domain.createEvent();

const handleCatchEmployeeStatusData = domain.createEvent<{
  id: number;
  status: UserStatusResponse | null;
}>();

const fetchOrganizationUserTasksByRoles = domain.createEvent();

const handleUpdateStatus =
  domain.createEvent<AddOrganizationUserWorkingStatusRequest>();

const sendUpdateStatusRequest = domain.createEvent();

const sendUpdateStatusRequestWithPayload =
  domain.createEvent<AddOrganizationUserWorkingStatusRequest>();

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

const fetchOrganizationUsersByRolesListFx = domain.createEffect<
  ESecuredIdentityRoleName[],
  OrganizationUsersByRolesList
>(getOrganizationUsersByRolesList);

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

const $isTransferUserTasksModalOpen = domain
  .createStore(false)
  .on(openTransferTasksModal, () => true)
  .reset(handleCloseModal);

const $organizationUsersByRolesList = domain
  .createStore<OrganizationUsersByRolesList | null>(null)
  .on(fetchOrganizationUsersByRolesListFx.doneData, (_, users) => users)
  .reset(handleCloseModal);

split({
  source: fetchOrganizationUserTasksByRolesFx.doneData,
  match: (tasksByRoles) => {
    const tasksCount = getTasksCount(tasksByRoles);

    return tasksCount > 0 ? 'tasksExist' : 'emptyTasksList';
  },
  cases: {
    emptyTasksList: sendUpdateStatusRequest,
    tasksExist: openTransferTasksModal,
  },
});

sample({
  clock: handleUpdateStatus,
  filter: (payload) => !isNeedTransferTasks(payload.type!),
  target: sendUpdateStatusRequestWithPayload,
});

sample({
  clock: handleUpdateStatus,
  filter: (payload) => isNeedTransferTasks(payload.type!),
  target: fetchOrganizationUserTasksByRoles,
});

sample({
  clock: fetchOrganizationUserTasksByRoles,
  source: $currentUser,
  filter: (user): user is OrganizationUserResponse => Boolean(user),
  fn: (user): GetOrganizationUserTasksByRolesRequestParams => {
    return {
      userId: user?.id!,
      roles: user?.roles!,
    };
  },
  target: fetchOrganizationUserTasksByRolesFx,
});

sample({
  clock: fetchOrganizationUserTasksByRoles,
  source: $currentUser,
  filter: (user): user is OrganizationUserResponse => Boolean(user),
  fn: (user) => {
    return user?.roles?.map((elem) => elem.key!) || [];
  },
  target: fetchOrganizationUsersByRolesListFx,
});

sample({
  source: $userStatusChangeRequestPayload,
  clock: sendUpdateStatusRequest,
  filter: (payload): payload is AddOrganizationUserWorkingStatusRequest =>
    Boolean(payload),
  fn: prepareUpdateStatusPayload,
  target: updateStatusFx,
});

sample({
  clock: sendUpdateStatusRequestWithPayload,
  fn: prepareUpdateStatusPayload,
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
    $isTransferUserTasksModalOpen,
    $currentUser,
    $organizationUsersByRolesList,
  },
};
