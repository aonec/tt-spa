import { axios } from 'api/axios';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeUpdateRequest,
} from 'api/types';

export const getTemperatureNormative = (): Promise<
  TemperatureNormativeResponse[]
> => axios.get('/TemperatureNormative');

export const putTemperatureNormative = (
  data: TemperatureNormativeUpdateRequest,
): Promise<any> => axios.put('/TemperatureNormative', data);
