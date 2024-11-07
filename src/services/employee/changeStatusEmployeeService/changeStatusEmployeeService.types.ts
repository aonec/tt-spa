import {
  EOrderByRule,
  EOrganizationUserWorkingStatusType,
  ESecuredIdentityRoleName,
  ESecuredIdentityRoleNameStringDictionaryItem,
  OrganizationUserListResponse,
  TasksPagedList,
  UserStatusResponse,
} from 'api/types';

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
  tasks: TasksPagedList | null;
}[];

export type EmployeeStatus = { id: number; status: UserStatusResponse | null };

export type GetOrganizationUsersListRequestParams = {
  Name?: string;
  IsSuspended?: boolean;
  RoleNames?: ESecuredIdentityRoleName[];
  WorkingStatusType?: EOrganizationUserWorkingStatusType;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type OrganizationUsersByRolesList = {
  users: OrganizationUserListResponse[];
  role: ESecuredIdentityRoleName;
}[];
