import { axios } from 'api/axios';
import { CheckDeviceRequest } from 'api/myApi';

export const fetchCloseCalculator = (
  payload: CheckDeviceRequest,
): Promise<void> => axios.post('MeteringDevices/check', payload);
