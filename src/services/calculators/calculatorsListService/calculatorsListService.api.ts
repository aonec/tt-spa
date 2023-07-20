import axios from 'api/axios';
import { CalculatorIntoHousingStockResponse } from 'myApi';

export const getCalculatorsList = (
  housingStockId: number,
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`Buildings/${housingStockId}/Calculators`);
