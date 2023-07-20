import queryString from 'query-string';
import { axios } from 'api/axios';
import {
  AddOrganizationUserWorkingStatusRequest,
  EOrganizationUserWorkingStatusType,
  ESecuredIdentityRoleName,
  OrganizationUserListResponsePagedList,
  OrganizationUserResponse,
  OrganizationUserWorkingStatusResponse,
  TasksPagedList,
} from 'myApi';
import {
  GetOrganizationUserTasksByRolesRequestParams,
  GetOrganizationUserTasksRequestParams,
  GetOrganizationUsersListRequestParams,
  OrganizationUsersByRolesList,
  UserTasksByRoles,
} from './changeStatusEmployeeService.types';

export const postEmloyeeStatus = (
  data: AddOrganizationUserWorkingStatusRequest,
): Promise<OrganizationUserWorkingStatusResponse | null> =>
  axios.post('OrganizationUserWorkingStatuses', data);

export const getOrganizationUser = (
  userId: number,
): Promise<OrganizationUserResponse> =>
  axios.get(`OrganizationUsers/${userId}`);

export const getOrganizationUserTasks = ({
  userId,
  ...params
}: GetOrganizationUserTasksRequestParams): Promise<TasksPagedList | null> =>
  axios.get(`OrganizationUsers/${userId}/Tasks`, { params });

export const getOrganizationUserTasksByRoles = ({
  userId,
  roles,
}: GetOrganizationUserTasksByRolesRequestParams): Promise<UserTasksByRoles> => {
  return Promise.all(
    roles.map(async (role) => {
      const pagedTasksList = await getOrganizationUserTasks({
        userId,
        CurrentStageRequiredUserRole: role.key,
      });

      return { role, tasks: pagedTasksList?.items || [] };
    }),
  );
};

export const getOrganizationUsersList = (
  params: GetOrganizationUsersListRequestParams,
): Promise<OrganizationUserListResponsePagedList> =>
  axios.get('OrganizationUsers', {
    params,
    paramsSerializer: queryString.stringify,
  });

export const getOrganizationUsersByRolesList = (
  roles: ESecuredIdentityRoleName[],
): Promise<OrganizationUsersByRolesList> => {
  return Promise.all(
    roles.map(async (role) => {
      const pagedTasksList = await getOrganizationUsersList({
        RoleNames: [role],
        WorkingStatusType: EOrganizationUserWorkingStatusType.Working,
      });

      return { role, users: pagedTasksList?.items || [] };
    }),
  );
};
