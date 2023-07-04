import { axios } from '01/axios';
import { StreetWithBuildingNumbersResponsePagedList } from 'myApi';
import { FetchAddressQueryType } from './districtBordersByAddressService.types';

export const getAddresses = (
  params: FetchAddressQueryType,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params,
  });
};
