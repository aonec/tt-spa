import { axios } from 'api/axios';
import {
  OrganizationUserResponse,
  OrganizationUserUpdateRequest,
} from '../../../api/types';

export function editEmployee(params: {
  userId: number;
  form: OrganizationUserUpdateRequest;
}): Promise<OrganizationUserResponse | null> {
  return axios.put(`OrganizationUsers/${params.userId}`, params.form);
}
