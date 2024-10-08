import queryString from 'query-string';
import {
  ApartmentActsConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
  HomeownersConstructedReportResponse,
} from 'api/types';
import { axios } from 'api/axios';
import {
  ActsJournalReportRequestPayload,
  EmployeeReportRequestPayload,
  EmployeeReportResponse,
  HomeownersReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  IndividualDeviceReportRequestPaload,
  ReportPayload,
} from './reportViewService.types';
import { downloadURI } from 'utils/downloadByURL';
import {
  DownloadEmployeeReportUrlsDictionary,
  DownloadReportUrlsDictionary,
  PrepareReportRequestFunctionsDictionary,
} from './reportViewService.constants';
import { ReportNamesDictionary } from '../view/ReportsPage/ReportsPage.constants';
import dayjs from 'api/dayjs';

export const getAddressesWithHouseManagements = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement');

export const getIndividualDevicesReport = (
  payload: IndividualDeviceReportRequestPaload,
): Promise<IndividualDevicesConstructedReportResponse[]> => {
  return axios.get('Reports/IndividualDevicesReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export const getActJournalReport = (
  payload: ActsJournalReportRequestPayload,
): Promise<ApartmentActsConstructedReportResponse> => {
  return axios.get('Reports/ApartmentActsReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export const getHousingMeteringDevicesReport = (
  payload: HousingMeteringDevicesReportRequestPayload,
): Promise<HousingDevicesConstructedReportResponse[]> => {
  return axios.get('Reports/HousingDevicesReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export const getHomeownersReport = (
  payload: HomeownersReportRequestPayload,
): Promise<HomeownersConstructedReportResponse[]> => {
  return axios.get('Reports/HomeownersReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export const downloadReportFile = async ({
  reportType,
  values,
}: ReportPayload) => {
  const prepareFunction = PrepareReportRequestFunctionsDictionary[reportType];

  const payload = prepareFunction(values);

  const employeeReportType = payload?.employeeReportType;

  const employeeReportUrl =
    employeeReportType &&
    DownloadEmployeeReportUrlsDictionary[employeeReportType];

  const reportUrl =
    employeeReportUrl || DownloadReportUrlsDictionary[reportType];

  if (!reportUrl) {
    return;
  }

  const res: string = await axios.get(reportUrl, {
    params: payload,
    responseType: 'blob',
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  const reportDatesString =
    payload?.From &&
    payload.To &&
    `${dayjs(payload.From).format('DD.MM.YYYY')} — ${dayjs(payload.To).format(
      'DD.MM.YYYY',
    )}`;

  const reportNameString = `${ReportNamesDictionary[reportType]}${
    reportDatesString ? ` ${reportDatesString}` : ''
  }`;

  downloadURI(url, reportNameString);
};

export const getEmployeeReport = async ({
  employeeReportType,
  From,
  To,
}: EmployeeReportRequestPayload): Promise<EmployeeReportResponse> => {
  const data = await axios.get(`Reports/${employeeReportType}`, {
    params: { From, To },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  return { [employeeReportType]: data };
};
