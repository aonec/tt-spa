import {
  AddOrganizationUserWorkingStatusRequest,
  UserStatusResponse,
} from 'api/myApi';

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
