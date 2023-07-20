import { axios } from 'api/axios';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'myApi';

export const fetchCreateCalculator = (
  payload: CreateCalculatorRequest,
): Promise<MeteringDeviceResponse> => axios.post('Calculators', payload);
