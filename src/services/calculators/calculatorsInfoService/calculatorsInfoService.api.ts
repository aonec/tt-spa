import { axios } from '01/axios';
import { CalculatorInfoListResponse } from 'myApi';

export const getCalculatorInfos = (): Promise<
  CalculatorInfoListResponse[] | null
> => {
  return axios.get('CalculatorInfos');
};
