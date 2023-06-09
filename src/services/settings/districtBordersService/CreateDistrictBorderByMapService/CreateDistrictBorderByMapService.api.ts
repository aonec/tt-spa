import { axios } from '01/axios';
import {
  DistrictCreateRequest,
  HousingStockListResponsePagedList,
} from 'myApi';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';

export const getHousingStocks = (
  params: GetHousingStocksRequestParams,
): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params });

export const createDistrict = (payload: DistrictCreateRequest): Promise<void> =>
  axios.post('IndividualSeal/Districts', payload);
