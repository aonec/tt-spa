import { UserTasksByRoles } from '../../changeStatusEmployeeService.types';

export type UserTasksTransferModalProps = {
  organizationUserTasksByRoles: UserTasksByRoles | null;
  isModalOpen: boolean;
};
