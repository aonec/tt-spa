import { CalculatorListResponsePagedList } from './../../../myApi';
import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';

export const getCalculatorsList = (
  params: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  axios.get(`Calculators`, {
    params,
  });
