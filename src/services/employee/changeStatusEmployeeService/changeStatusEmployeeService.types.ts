import {
  EOrderByRule,
  ESecuredIdentityRoleName,
  ESecuredIdentityRoleNameStringDictionaryItem,
  TaskListResponse,
  UserStatusResponse,
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
  roles: ESecuredIdentityRoleNameStringDictionaryItem[];
};

export type UserTasksByRoles = {
  role: ESecuredIdentityRoleNameStringDictionaryItem;
  tasks: TaskListResponse[];
}[];

export type EmployeeStatus = { id: number; status: UserStatusResponse | null };
