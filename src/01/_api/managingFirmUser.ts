import axios from '01/axios';
import { OrganizationUserResponse } from 'myApi';

export const getManagingFirmUser = (
  id: number
): Promise<OrganizationUserResponse> => axios.get(`ManagingFirmUsers/${id}`);

export const getCurrentManagingFirmUser = (): Promise<OrganizationUserResponse> =>
  axios.get('ManagingFirmUsers/current');
