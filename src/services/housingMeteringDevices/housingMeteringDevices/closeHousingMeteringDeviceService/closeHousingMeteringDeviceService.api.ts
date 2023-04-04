import { axios } from '01/axios';
import { CloseDeviceRequest } from 'myApi';

export const closeDevice = (
  request: CloseDeviceRequest
): Promise<void> => {
  return axios.post('MeteringDevices/close', request);
};
