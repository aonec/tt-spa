import { axios } from 'api/axios';
import { CreatePipeHousingMeteringDeviceRequest } from 'myApi';

export const fetchAddHousingMeteringDevice = (
  payload: CreatePipeHousingMeteringDeviceRequest,
): Promise<void> => axios.post('PipeHousingMeteringDevices', payload);
