import { CalculatorListResponsePagedList } from '../../../api/types';
import { CalculatorsListRequestPayload } from '../../../01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { axios } from '../../../api/axios';

export const getCalculatorsList = (
    payload: CalculatorsListRequestPayload
  ): Promise<CalculatorListResponsePagedList> =>
    axios.get('Calculators', { params: payload });
  