import { axios } from 'api/axios';
import { CheckDeviceRequest } from 'myApi';

export const postCheckDevice = (request: CheckDeviceRequest): Promise<void> => {
  return axios.post('MeteringDevices/check', request);
};
