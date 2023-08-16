import { axios } from 'api/axios';
import { TemperatureNormativeResponse } from 'api/types';

export const getTemperatureNormative = (): Promise<
  TemperatureNormativeResponse[]
> => axios.get('/TemperatureNormative');
