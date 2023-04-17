import { OrganizationUserResponse } from 'myApi';

export type EmployeeProfileProps = {
  userData: OrganizationUserResponse | null;
  handleOpenChangeStatusModal: () => void;
  handleOpenDeleteEmployeeModal: () => void;
};
