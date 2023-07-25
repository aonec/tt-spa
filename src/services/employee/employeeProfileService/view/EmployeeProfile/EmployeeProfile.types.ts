import { OrganizationUserResponse } from 'api/types';

export type EmployeeProfileProps = {
  userData: OrganizationUserResponse | null;
  handleOpenChangeStatusModal: () => void;
  handleOpenDeleteEmployeeModal: () => void;
};
