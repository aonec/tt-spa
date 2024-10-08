import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample, split } from 'effector';
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
  OrganizationUserTaskReassignment,
  OrganizationUserWorkingStatusResponse,
  UserStatusResponse,
} from 'api/types';
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

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const openTransferTasksModal = createEvent();

const handleCatchEmployeeStatusData = createEvent<{
  id: number;
  status: UserStatusResponse | null;
}>();

const fetchOrganizationUserTasksByRoles = createEvent();

const handleUpdateStatus =
  createEvent<AddOrganizationUserWorkingStatusRequest>();

const sendUpdateStatusRequest = createEvent();

const sendUpdateStatusRequestWithPayload =
  createEvent<AddOrganizationUserWorkingStatusRequest>();

const handleApplyTasksReassignment =
  createEvent<OrganizationUserTaskReassignment[]>();

const updateStatusFx = createEffect<
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse | null,
  EffectFailDataAxiosError
>(postEmloyeeStatus);

const fetchOrganizationUserFx = createEffect<number, OrganizationUserResponse>(
  getOrganizationUser,
);

const fetchOrganizationUserTasksByRolesFx = createEffect<
  GetOrganizationUserTasksByRolesRequestParams,
  UserTasksByRoles
>(getOrganizationUserTasksByRoles);

const fetchOrganizationUsersByRolesListFx = createEffect<
  ESecuredIdentityRoleName[],
  OrganizationUsersByRolesList
>(getOrganizationUsersByRolesList);

const successUpdateStatus = updateStatusFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const $employeeStatus = createStore<EmployeeStatus | null>(null)
  .on(handleCatchEmployeeStatusData, (_, data) => data)
  .reset(handleCloseModal);

const $currentUser = createStore<OrganizationUserResponse | null>(null)
  .on(fetchOrganizationUserFx.doneData, (_, user) => user)
  .reset(handleCloseModal);

const $organizationUserTasksByRoles = createStore<UserTasksByRoles | null>(null)
  .on(fetchOrganizationUserTasksByRolesFx.doneData, (_, data) => data)
  .reset(handleCloseModal);

$organizationUserTasksByRoles.watch((data) => console.log(data));

const $userStatusChangeRequestPayload =
  createStore<AddOrganizationUserWorkingStatusRequest | null>(null)
    .on(handleUpdateStatus, (_, data) => data)
    .reset(handleCloseModal);

const $isTransferUserTasksModalOpen = createStore(false)
  .on(openTransferTasksModal, () => true)
  .reset(handleCloseModal);

const $organizationUsersByRolesList =
  createStore<OrganizationUsersByRolesList | null>(null)
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

sample({
  source: $userStatusChangeRequestPayload,
  clock: handleApplyTasksReassignment,
  fn: (payload, reassignments) => ({ ...payload, reassignments }),
  target: sendUpdateStatusRequestWithPayload,
});

updateStatusFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

sample({
  clock: successUpdateStatus,
  target: handleCloseModal,
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
    handleApplyTasksReassignment,
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
