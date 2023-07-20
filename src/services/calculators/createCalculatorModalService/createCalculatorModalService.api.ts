import { axios } from 'api/axios';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'api/types';

export const fetchCreateCalculator = (
  payload: CreateCalculatorRequest,
): Promise<MeteringDeviceResponse> => axios.post('Calculators', payload);
