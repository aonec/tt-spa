import { axios } from '01/axios';
import { HousingStockListResponsePagedList } from 'myApi';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getHousuingStocks = (
  params: GetHousingStocksRequestPayload
): Promise<HousingStockListResponsePagedList> => {
  return axios.get('HousingStocks', { params });
};
