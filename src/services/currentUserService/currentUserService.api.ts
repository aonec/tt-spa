import { axios } from '01/axios';
import { OrganizationUserResponse } from 'myApi';

export const getCurrentUser = (): Promise<OrganizationUserResponse> =>
  axios.get('OrganizationUsers/current');
