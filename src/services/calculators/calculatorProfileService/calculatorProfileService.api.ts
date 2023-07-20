import { axios } from 'api/axios';
import { CalculatorResponse } from 'api/myApi';

export const fetchCalculator = (
  calcilatorId: number,
): Promise<CalculatorResponse> => axios.get(`Calculators/${calcilatorId}`);
