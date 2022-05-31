import { axios } from '01/axios';
import { HousingStockListResponsePagedList } from 'myApi';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getHosuingStocks = (
  params: GetHousingStocksRequestPayload
): Promise<HousingStockListResponsePagedList> => {
  return axios.get('HousingStocks', { params });
};
