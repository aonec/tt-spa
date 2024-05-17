import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'api/types';
import { EditPayloud } from './currentUserEditServiceService.types';

export function editUser(
  params: EditPayloud,
): Promise<OrganizationUserResponse > {
  return axios.put(`OrganizationUsers/${params.userId}`, params.form);
}
