import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';

export const getAdresses = (
  city: string,
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
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
