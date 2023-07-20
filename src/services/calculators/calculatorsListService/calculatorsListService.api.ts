import axios from 'api/axios';
import { CalculatorIntoHousingStockResponse } from 'api/myApi';

export const getCalculatorsList = (
  housingStockId: number,
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`Buildings/${housingStockId}/Calculators`);
