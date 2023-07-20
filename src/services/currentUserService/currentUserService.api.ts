import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'myApi';

export const getCurrentUser = (): Promise<OrganizationUserResponse> =>
  axios.get('OrganizationUsers/current');
