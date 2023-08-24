import { axios } from 'api/axios';
import {
  HouseManagementResponse,
  HousingStockResponse,
  OrganizationResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';

export const getAdresses = (
  city: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: { city },
  });
};

export const getHousingStockData = (
  housingStockId: number,
): Promise<HousingStockResponse> => {
  return axios.get(`HousingStocks/${housingStockId}`);
};

export const getOrganizations = (): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations');
};

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};
