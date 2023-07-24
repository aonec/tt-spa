import { axios } from 'api/axios';
import { CloseDeviceRequest } from 'api/types';

export const fetchCloseCalculator = (
  payload: CloseDeviceRequest,
): Promise<void> => axios.post('MeteringDevices/close', payload);
