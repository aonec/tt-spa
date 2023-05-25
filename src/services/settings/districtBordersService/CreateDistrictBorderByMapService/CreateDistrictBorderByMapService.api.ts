import { axios } from '01/axios';
import { HousingStockListResponsePagedList } from 'myApi';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';

export const getHousingStocks = (
  params: GetHousingStocksRequestParams,
): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params });
