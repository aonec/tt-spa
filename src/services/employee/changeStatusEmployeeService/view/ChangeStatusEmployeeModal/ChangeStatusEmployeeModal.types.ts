import {
  AddOrganizationUserWorkingStatusRequest,
  UserStatusResponse,
} from 'myApi';

export type ChangeStatusEmployeeModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateStatus: (
    payload: AddOrganizationUserWorkingStatusRequest,
  ) => void;
  employeeStatus: {
    id: number;
    status: UserStatusResponse | null;
  } | null;
};
