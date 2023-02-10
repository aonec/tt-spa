import queryString from 'query-string';
import {
  ApartmentActsConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
  HomeownersConstructedReportResponse,
} from 'myApi';
import { axios } from '01/axios';
import {
  ActsJournalReportRequestPayload,
  HomeownersReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  IndividualDeviceReportRequestPaload,
} from './reportViewService.types';

export const getAddressesWithHouseManagements = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement',
  );

export const getIndividualDevicesReport = (
  payload: IndividualDeviceReportRequestPaload,
): Promise<IndividualDevicesConstructedReportResponse[]> => {
  return axios.get('Reports/IndividualDevicesReport', {
    params: payload,
    paramsSerializer: queryString.stringify,
  });
};

export const getActJournalReport = (
  payload: ActsJournalReportRequestPayload,
): Promise<ApartmentActsConstructedReportResponse> => {
  return axios.get('Reports/ApartmentActsReport', {
    params: payload,
    paramsSerializer: queryString.stringify,
  });
};

export const getHousingMeteringDevicesReport = (
  payload: HousingMeteringDevicesReportRequestPayload,
): Promise<HousingDevicesConstructedReportResponse[]> => {
  return axios.get('Reports/HousingDevicesReport', {
    params: payload,
    paramsSerializer: queryString.stringify,
  });
};

export const getHomeownersReport = (
  payload: HomeownersReportRequestPayload,
): Promise<HomeownersConstructedReportResponse[]> => {
  return axios.get('Reports/HomeownersReport', {
    params: payload,
    paramsSerializer: queryString.stringify,
  });
};
