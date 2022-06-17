import { axios } from '01/axios';
import { ManagingFirmUserResponse } from 'myApi';

export const getCurrentUser = (): Promise<ManagingFirmUserResponse> =>
  axios.get('ManagingFirmUsers/current');
