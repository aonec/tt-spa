import axios from '../../api/axios';
import { CalculatorIntoHousingStockResponse } from '../../api/types';

export const getCalculatorsList = (
  housingStockId: number
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`HousingStocks/${housingStockId}/Calculators`);
