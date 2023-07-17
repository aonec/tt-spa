import { axios } from '01/axios';
import { BuildingListResponsePagedList } from 'myApi';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getBuildings = (
  params: GetHousingStocksRequestPayload,
): Promise<BuildingListResponsePagedList> => {
  return axios.get('Buildings', { params });
};
