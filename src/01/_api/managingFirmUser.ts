import axios from '01/axios';
import { ManagingFirmUserResponse } from 'myApi';

export const getManagingFirmUser = (
  id: number
): Promise<ManagingFirmUserResponse> => axios.get(`OrganizationUsers/${id}`);

export const getCurrentManagingFirmUser = (): Promise<ManagingFirmUserResponse> =>
  axios.get('OrganizationUsers/current');
