import { axios } from '01/axios';
import { ManagementFirmResponse } from 'myApi';

export const getCurrentUser = (): Promise<ManagementFirmResponse> =>
  axios.get('ManagingFirms/current');
