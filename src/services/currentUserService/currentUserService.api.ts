import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'api/myApi';

export const getCurrentUser = (): Promise<OrganizationUserResponse> =>
  axios.get('OrganizationUsers/current');
