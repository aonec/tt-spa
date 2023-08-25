import { axios } from 'api/axios';
import { CreatePipeHousingMeteringDeviceRequest } from 'api/types';

export const fetchAddHousingMeteringDevice = (
  payload: CreatePipeHousingMeteringDeviceRequest,
): Promise<void> => axios.post('PipeHousingMeteringDevices', payload);
