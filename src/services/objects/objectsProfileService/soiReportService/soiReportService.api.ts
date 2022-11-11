import { axios } from '01/axios';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  GetAddressesRequestPayload,
  GetHouseManagementsRequestPayload,
} from './soiReportService.model.types';

export const getHouseManagements = (
  params: GetHouseManagementsRequestPayload
): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements', { params });

export const getAdresses = (
  payload: GetAddressesRequestPayload
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};
