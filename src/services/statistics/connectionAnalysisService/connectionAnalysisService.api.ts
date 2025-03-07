import { axios } from 'api/axios';
import { CalculatorsSortedListApi } from './connectionAnalysisService.types';

export const getCalculators = (): Promise<CalculatorsSortedListApi> =>
  axios.get('CalculatorsStatistics');

export const downloadCalculators = (): Promise<CalculatorsSortedListApi> =>
  axios.get('CalculatorsStatistics/export');
