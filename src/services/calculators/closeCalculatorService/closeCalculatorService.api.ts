import { axios } from 'api/axios';
import { CloseDeviceRequest } from 'myApi';

export const fetchCloseCalculator = (
  payload: CloseDeviceRequest,
): Promise<void> => axios.post('MeteringDevices/close', payload);
