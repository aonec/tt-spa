import {
  ApartmentActsConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
  HouseManagementWithStreetsResponse
} from 'myApi';
import { axios } from '01/axios';
import { IndividualDeviceReportRequestPaload } from './reportViewService.types';
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
  payload: IndividualDeviceReportRequestPaload,
): Promise<ApartmentActsConstructedReportResponse> => {
  return axios.get('Reports/ApartmentActsReport', {
    params: payload,
    paramsSerializer: queryString.stringify,
  });
};
