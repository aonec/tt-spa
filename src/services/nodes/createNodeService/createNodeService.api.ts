import { axios } from '01/axios';
import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
} from 'myApi';

export const getHousingStock = (
  housingStockId: number
): Promise<HousingStockResponse> =>
  axios.get(`/HousingStocks/${housingStockId}`);

export const getCalculatorsList = async (
  housingStockId: number
): Promise<CalculatorIntoHousingStockResponse[] | null> =>
  axios.get(`HousingStocks/${housingStockId}/Calculators`);
