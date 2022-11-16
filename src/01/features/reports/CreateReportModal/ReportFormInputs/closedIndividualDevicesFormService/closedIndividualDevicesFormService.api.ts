import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';


export const getAdresses = (
  payload: void
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};

export const getOrganizations = (
  payload: void
): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations', {
    params: payload,
  });
};

export const getHouseManagements = (
  payload: void
): Promise<HouseManagementResponse[] | null> => {
  return axios.get('HouseManagements', {
    params: payload,
  });
};
