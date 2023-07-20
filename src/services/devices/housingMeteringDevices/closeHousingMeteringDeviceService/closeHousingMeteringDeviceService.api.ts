import { axios } from 'api/axios';
import { CloseDeviceRequest } from 'api/types';

export const closeDevice = (request: CloseDeviceRequest): Promise<void> => {
  return axios.post('MeteringDevices/close', request);
};
