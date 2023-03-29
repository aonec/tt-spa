import { axios } from '01/axios';
import { HousingStockResponse, HousingStockUpdateRequest } from 'myApi';

export const updateHousingStock = (payload: {
  housingStockId: number;
  data: HousingStockUpdateRequest;
}): Promise<HousingStockResponse> =>
  axios.put(`HousingStocks/${payload.housingStockId}`, payload.data);
