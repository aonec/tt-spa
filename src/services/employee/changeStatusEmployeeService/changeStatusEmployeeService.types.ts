import {
  EOrderByRule,
  ESecuredIdentityRoleName,
  TaskListResponse,
} from 'myApi';

export type GetOrganizationUserTasksRequestParams = {
  CurrentStageRequiredUserRole?: ESecuredIdentityRoleName;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
} & { userId: number };

export type GetOrganizationUserTasksByRolesRequestParams = {
  userId: number;
  roles: ESecuredIdentityRoleName[];
};

export type UserTasksByRoles = {
  role: ESecuredIdentityRoleName;
  tasks: TaskListResponse[];
}[];
