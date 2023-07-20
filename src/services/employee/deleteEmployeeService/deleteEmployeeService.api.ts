import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'myApi';

export const deleteManagingFirmUser = (
  id: number,
): Promise<OrganizationUserResponse | null> =>
  axios.post(`OrganizationUsers/${id}/suspend`);
