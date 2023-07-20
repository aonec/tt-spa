import {
  AddOrganizationUserWorkingStatusRequest,
  UserStatusResponse,
} from 'api/types';

export type ChangeStatusEmployeeFormProps = {
  formId: string;
  handleUpdateStatus: (
    payload: AddOrganizationUserWorkingStatusRequest,
  ) => void;
  employeeStatus: {
    id: number;
    status: UserStatusResponse | null;
  } | null;
};
