import { axios } from 'api/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { CalculatorListResponsePagedList } from 'api/myApi';

export const getCalculatorsList = (
  payload: CalculatorsListRequestPayload,
): Promise<CalculatorListResponsePagedList> =>
  axios.get('Calculators', { params: payload });
