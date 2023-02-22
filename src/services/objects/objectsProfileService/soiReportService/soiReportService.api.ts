import { axios } from '01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import { GetAddressesWithCityRequestPayload } from '01/features/settings/uniqueWorkingRangeService/uniqueWorkingRangeService.types';
import { omit } from 'lodash';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CreateSoiReportRequestPayload,
  GetHouseManagementsRequestPayload,
} from './soiReportService.types';
import queryString from 'query-string';

export const getSoiReport = async (
  params: CreateSoiReportRequestPayload,
): Promise<void> => {
  const res: string = await axios.get('Reports/SoiReport', {
    params: omit(params, ['ReportName']),
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, `${params.ReportName}_${params.Month}.${params.Year}`);
};

export const getHouseManagements = (
  params: GetHouseManagementsRequestPayload,
): Promise<HouseManagementResponse[]> =>
  axios.get('HouseManagements', { params });

export const getAdresses = (
  payload: GetAddressesWithCityRequestPayload,
): Promise<StreetWithHousingStockNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: payload,
  });
};
