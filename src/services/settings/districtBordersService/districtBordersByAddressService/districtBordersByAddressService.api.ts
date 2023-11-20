import { axios } from 'api/axios';
import {
  DistrictResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { FetchAddressQueryType } from './districtBordersByAddressService.types';

export const getAddresses = (
  params: FetchAddressQueryType,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params,
  });
};

export const getDistrictsWithHouses = (): Promise<DistrictResponse[]> =>
  axios.get('IndividualSeal/Districts');
