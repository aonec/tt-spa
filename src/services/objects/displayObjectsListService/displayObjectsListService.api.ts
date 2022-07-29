import { axios } from '../../../api/axios';
import { HousingStockListResponsePagedList } from '../../../api/types';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getHosuingStocks = (
  params: GetHousingStocksRequestPayload
): Promise<HousingStockListResponsePagedList> => {
  return axios.get('HousingStocks', { params });
};
