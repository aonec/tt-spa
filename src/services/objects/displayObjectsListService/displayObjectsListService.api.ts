import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/myApi';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getHousuingStocks = (
  params: GetHousingStocksRequestPayload,
): Promise<BuildingListResponsePagedList> => {
  return axios.get('Buildings', { params });
};
