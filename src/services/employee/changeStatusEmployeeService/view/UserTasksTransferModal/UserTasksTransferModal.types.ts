import { OrganizationUserResponse } from 'myApi';
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
};
