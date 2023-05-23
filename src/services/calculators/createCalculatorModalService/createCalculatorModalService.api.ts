import { axios } from '01/axios';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'myApi';

export const fetchCreateCalculator = (
  payload: CreateCalculatorRequest,
): Promise<MeteringDeviceResponse> => axios.post('Calculators', payload);
