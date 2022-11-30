import { axios } from '01/axios';
import { HousingStockResponse } from 'myApi';

export const getHousingStock = (
  housingStockId: number
): Promise<HousingStockResponse> =>
  axios.get(`/HousingStocks/${housingStockId}`);
