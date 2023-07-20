import { OrganizationUserResponse } from 'api/myApi';

export type EmployeeProfileProps = {
  userData: OrganizationUserResponse | null;
  handleOpenChangeStatusModal: () => void;
  handleOpenDeleteEmployeeModal: () => void;
};
