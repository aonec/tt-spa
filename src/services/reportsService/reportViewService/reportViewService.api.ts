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
  ReportPayload,
} from './reportViewService.types';
import { downloadURI } from 'utils/downloadByURL';
import {
  DownloadReportUrlsDictionary,
  PrepareReportRequestFunctionsDictionary,
} from './reportViewService.constants';
import { ReportNamesDictionary } from '../view/ReportsPage/ReportsPage.constants';
import moment from 'moment';

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

export const downloadReportFile = async ({
  reportType,
  values,
}: ReportPayload) => {
  const prepareFunction = PrepareReportRequestFunctionsDictionary[reportType];

  const payload = prepareFunction(values);

  const res: string = await axios.get(
    DownloadReportUrlsDictionary[reportType],
    {
      params: payload,
      responseType: 'blob',
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    },
  );

  const url = window.URL.createObjectURL(new Blob([res]));

  const reportDatesString =
    payload?.From &&
    payload.To &&
    `${moment(payload.From).format('DD.MM.YYYY')} — ${moment(payload.To).format(
      'DD.MM.YYYY',
    )}`;

  const reportNameString = `${ReportNamesDictionary[reportType]}${
    reportDatesString ? ` ${reportDatesString}` : ''
  }`;

  downloadURI(url, reportNameString);
};
