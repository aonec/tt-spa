import { combine, createDomain, forward, sample } from 'effector';
import {
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
  GetOrganizationUserTasksByRolesRequestParams,
  UserTasksByRoles,
} from './changeStatusEmployeeService.types';
import { currentUserService } from 'services/currentUserService';
import { getTasksCount } from './changeStatusEmployeeService.utils';

const domain = createDomain('changeStatusEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCatchEmployeeStatusData = domain.createEvent<{
  id: number;
  status: UserStatusResponse | null;
}>();

const handleUpdateStatus =
  domain.createEvent<AddOrganizationUserWorkingStatusRequest>();

const updateStatusFx = domain.createEffect<
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse | null,
  EffectFailDataAxiosError
>(postEmloyeeStatus);

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
  .createStore<{ id: number; status: UserStatusResponse | null } | null>(null)
  .on(handleCatchEmployeeStatusData, (_, data) => data);

const $organizationUserTasksByRoles = domain
  .createStore<UserTasksByRoles | null>(null)
  .on(fetchOrganizationUserTasksByRolesFx.doneData, (_, data) => data);

const $userTasksByRolesCount = $organizationUserTasksByRoles.map(
  (tasksByRoles) => getTasksCount(tasksByRoles || []),
);

sample({
  clock: handleUpdateStatus,
  source: currentUserService.outputs.$currentUser,
  filter: (user): user is OrganizationUserResponse => Boolean(user),
  fn: (user): GetOrganizationUserTasksByRolesRequestParams => {
    return {
      userId: user?.id!,
      roles: user?.roles?.map((elem) => elem.key!)!,
    };
  },
  target: fetchOrganizationUserTasksByRolesFx,
});

// sample({
//   clock: handleUpdateStatus,
//   fn: (data) => {
//     return {
//       ...data,
//       startDate: moment(data.startDate)
//         .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
//         .toISOString(true),
//       endDate: moment(data.endDate)
//         .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
//         .toISOString(true),
//     };
//   },
//   target: updateStatusFx,
// });

updateStatusFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

forward({
  from: successUpdateStatus,
  to: handleCloseModal,
});

successUpdateStatus.watch(() => message.success('Статус изменен!'));

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
  },
};
