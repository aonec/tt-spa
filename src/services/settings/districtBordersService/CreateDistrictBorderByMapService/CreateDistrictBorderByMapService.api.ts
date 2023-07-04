import { axios } from '01/axios';
import {
  BuildingListResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'myApi';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';

export const getHousingStocks = (
  params: GetHousingStocksRequestParams,
): Promise<BuildingListResponsePagedList> => axios.get('Buildings', { params });

export const createDistrict = (payload: DistrictCreateRequest): Promise<void> =>
  axios.post('IndividualSeal/Districts', payload);

export const getExistingDistricts = async (): Promise<DistrictResponse[]> => {
  const districts: DistrictResponse[] = await axios.get(
    'IndividualSeal/Districts',
  );

  return districts;
};
