import { axios } from 'api/axios';
import { CalculatorListResponsePagedList } from 'api/types';

export const getCalculators = (): Promise<CalculatorListResponsePagedList> =>
  axios.get('Calculators');
