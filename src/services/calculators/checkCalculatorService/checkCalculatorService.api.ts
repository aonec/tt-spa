import { axios } from 'api/axios';
import { CheckDeviceRequest } from 'api/types';

export const fetchCloseCalculator = (
  payload: CheckDeviceRequest,
): Promise<void> => axios.post('MeteringDevices/check', payload);
