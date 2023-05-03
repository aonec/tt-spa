import { axios } from '01/axios';
import { CreatePipeHousingMeteringDeviceRequest } from 'myApi';

export const fetchAddHousingMeteringDevice = (
  payload: CreatePipeHousingMeteringDeviceRequest,
): Promise<void> => axios.post('PipeHousingMeteringDevices', payload);
