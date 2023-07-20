import { axios } from 'api/axios';
import { CalculatorResponse } from 'myApi';

export const fetchCalculator = (
  calcilatorId: number,
): Promise<CalculatorResponse> => axios.get(`Calculators/${calcilatorId}`);
