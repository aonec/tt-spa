import axios from '../../api/axios';
import { ManagingFirmUserResponse } from '../../api/types';

export const getManagingFirmUser = (
  id: number
): Promise<ManagingFirmUserResponse> => axios.get(`ManagingFirmUsers/${id}`);

export const getCurrentManagingFirmUser = (): Promise<ManagingFirmUserResponse> =>
  axios.get('ManagingFirmUsers/current');
