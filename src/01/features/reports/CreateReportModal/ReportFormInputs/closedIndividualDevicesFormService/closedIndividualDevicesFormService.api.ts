import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'myApi';

export const getAdresses = (
  city: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: { city },
  });
};

export const getOrganizations = (): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations');
};

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};
