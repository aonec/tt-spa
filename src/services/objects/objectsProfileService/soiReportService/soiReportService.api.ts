import { axios } from '01/axios';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CreateSoiReportRequestPayload,
  GetAddressesRequestPayload,
  GetHouseManagementsRequestPayload,
} from './soiReportService.model.types';

export const getSoiReport = (
  params: CreateSoiReportRequestPayload
): Promise<void> => axios.get('Reports/SoiReport', { params });

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
