import { axios } from '../../api/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { CalculatorListResponsePagedList } from '../../api/types';

export const getCalculatorsList = (
    payload: CalculatorsListRequestPayload
  ): Promise<CalculatorListResponsePagedList> =>
    axios.get('Calculators', { params: payload });
  