import axios from '01/axios';
import { CalculatorsListRequestPayload } from './types';
import { CalculatorListResponsePagedList } from './../../../../myApi';

export const getCalculatorsList = (
  payload: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  axios.get('Calculators', { params: payload });
