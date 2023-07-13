import axios from '01/axios';
import { CalculatorIntoHousingStockResponse } from 'myApi';

export const getCalculatorsList = (
  housingStockId: number,
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`Buildings/${housingStockId}/Calculators`);
