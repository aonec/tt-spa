import {
  ESecuredIdentityRoleName,
  OrganizationUserResponse,
  OrganizationUserTaskReassignment,
} from 'api/myApi';
import {
  OrganizationUsersByRolesList,
  UserTasksByRoles,
} from '../../changeStatusEmployeeService.types';

export type UserTasksTransferModalProps = {
  organizationUserTasksByRoles: UserTasksByRoles | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  currentUser: OrganizationUserResponse | null;
  organizationUsersByRolesList: OrganizationUsersByRolesList | null;
  isLoading: boolean;
  handleApplyTasksReassignment: (
    payload: OrganizationUserTaskReassignment[],
  ) => void;
};

export type UserReassignment = {
  role: ESecuredIdentityRoleName;
  userId: number | null;
};
