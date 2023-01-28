import { axios } from '01/axios';
import { CalculatorResponse } from 'myApi';

export const fetchCalculator = (
  calcilatorId: number
): Promise<CalculatorResponse> => axios.get(`Calculators/${calcilatorId}`);
