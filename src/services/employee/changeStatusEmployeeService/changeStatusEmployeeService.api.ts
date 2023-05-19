import { axios } from '01/axios';
import {
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse,
  TasksPagedList,
} from 'myApi';
import {
  GetOrganizationUserTasksByRolesRequestParams,
  GetOrganizationUserTasksRequestParams,
  UserTasksByRoles,
} from './changeStatusEmployeeService.types';

export const postEmloyeeStatus = (
  data: AddOrganizationUserWorkingStatusRequest,
): Promise<OrganizationUserWorkingStatusResponse | null> =>
  axios.post('OrganizationUserWorkingStatuses', data);

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
      const pagedTasksList = await getOrganizationUserTasks({ userId });

      return { role, tasks: pagedTasksList?.items || [] };
    }),
  );
};
