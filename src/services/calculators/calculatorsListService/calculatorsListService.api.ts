import axios from '01/axios';
import { CalculatorIntoHousingStockResponse } from 'myApi';

export const getCalculatorsList = (
  housingStockId: number,
  //Дождаться правок
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`Buildings/${housingStockId}/Calculators`);
