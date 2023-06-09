import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { CalculatorListResponsePagedList } from 'myApi';

export const getCalculatorsList = (
  payload: CalculatorsListRequestPayload,
): Promise<CalculatorListResponsePagedList> =>
  axios.get('Calculators', { params: payload });
