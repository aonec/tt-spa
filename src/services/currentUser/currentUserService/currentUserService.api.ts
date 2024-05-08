import { axios } from 'api/axios';
import { OrganizationUserResponse } from 'api/types';

export const getCurrentUser = (): Promise<OrganizationUserResponse> =>
  axios.get('OrganizationUsers/current');
