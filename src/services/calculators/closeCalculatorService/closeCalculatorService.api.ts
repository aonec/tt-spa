import { axios } from '01/axios';
import { CloseDeviceRequest } from 'myApi';

export const fetchCloseCalculator = (
  payload: CloseDeviceRequest
): Promise<void> => axios.post('MeteringDevices/close', payload);
