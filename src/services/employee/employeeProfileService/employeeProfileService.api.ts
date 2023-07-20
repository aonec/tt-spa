import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'myApi';

export const getUserData = (
  userId: string,
): Promise<OrganizationUserResponse | null> => {
  return axios.get(`OrganizationUsers/${userId}`);
};
