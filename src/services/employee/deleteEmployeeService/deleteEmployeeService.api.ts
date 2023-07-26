import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'api/types';

export const deleteManagingFirmUser = (
  id: number,
): Promise<OrganizationUserResponse | null> =>
  axios.post(`OrganizationUsers/${id}/suspend`);
