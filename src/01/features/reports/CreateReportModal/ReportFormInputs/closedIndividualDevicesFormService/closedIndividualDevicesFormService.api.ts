import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';

export const getAdresses =
  (): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
    return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers');
  };

export const getOrganizations = (): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations');
};

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};
