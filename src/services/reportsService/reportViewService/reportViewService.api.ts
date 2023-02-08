import {
  ApartmentActsConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
} from 'myApi';
import { axios } from '01/axios';
import {
  ActsJournalReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  IndividualDeviceReportRequestPaload,
} from './reportViewService.types';
import queryString from 'query-string';

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
