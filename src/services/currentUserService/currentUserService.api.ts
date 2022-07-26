import { axios } from '../../api/axios';
import { ManagingFirmUserResponse } from '../../api/types';

export const getCurrentUser = (): Promise<ManagingFirmUserResponse> =>
  axios.get('ManagingFirmUsers/current');
