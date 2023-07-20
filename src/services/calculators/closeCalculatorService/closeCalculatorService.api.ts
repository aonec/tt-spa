import { axios } from 'api/axios';
import { CloseDeviceRequest } from 'api/myApi';

export const fetchCloseCalculator = (
  payload: CloseDeviceRequest,
): Promise<void> => axios.post('MeteringDevices/close', payload);
