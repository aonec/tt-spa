import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/types';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';

export const getBuildings = (
  params: GetHousingStocksRequestPayload,
): Promise<BuildingListResponsePagedList> => {
  return axios.get('Buildings', { params });
};
