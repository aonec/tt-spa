import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';


export const getAdresses = (
  payload: any
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};

export const getOrganizations = (
  payload: any
): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations', {
    params: payload,
  });
};

export const getHouseManagements = (
  payload: any
): Promise<HouseManagementResponse[] | null> => {
  return axios.get('HouseManagements', {
    params: payload,
  });
};
