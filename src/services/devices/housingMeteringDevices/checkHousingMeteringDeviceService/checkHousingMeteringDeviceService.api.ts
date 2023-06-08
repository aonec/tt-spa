import { axios } from '01/axios';
import { CheckDeviceRequest } from 'myApi';

export const postCheckDevice = (request: CheckDeviceRequest): Promise<void> => {
  return axios.post('MeteringDevices/check', request);
};
