import { axios } from '01/axios';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  GetAddressesRequestPayload,
  GetHouseManagementsPayload,
  GetOrganizationsPayload,
} from './closedIndividualDevicesFormService.types';

export const getAdresses = (
  payload: GetAddressesRequestPayload
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};

export const getOrganizations = (
  payload: GetOrganizationsPayload
): Promise<OrganizationResponsePagedList> => {
  return axios.get('Organizations', {
    params: payload,
  });
};

export const getHouseManagements = (
  payload: GetHouseManagementsPayload
): Promise<HouseManagementResponse[] | null> => {
  return axios.get('HouseManagements', {
    params: payload,
  });
};
