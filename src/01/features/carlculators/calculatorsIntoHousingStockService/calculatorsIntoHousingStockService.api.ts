import axios from '01/axios';
import { CalculatorIntoHousingStockResponse } from 'myApi';

export const getCalculatorsList = (
  housingStockId: number
): Promise<CalculatorIntoHousingStockResponse[]> =>
  axios.get(`HousingStocks/${housingStockId}/Calculators`);

console.log(axios.get('Calculators'));
