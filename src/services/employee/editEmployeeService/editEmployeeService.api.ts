import { axios } from '01/axios';
import {
  OrganizationUserResponse,
  OrganizationUserUpdateRequest,
} from '../../../myApi';

export function editEmployee(params: {
  userId: number;
  form: OrganizationUserUpdateRequest;
}): Promise<OrganizationUserResponse | null> {
  return axios.put(`OrganizationUsers/${params.userId}`, params.form);
}
