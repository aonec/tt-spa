import { axios } from 'api/axios';
import { GetAddressesWithCityRequestPayload } from 'services/workingRanges/uniqueWorkingRangeService/uniqueWorkingRangeService.types';
import { omit } from 'lodash';
import {
  HouseManagementResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  CreateSoiReportRequestPayload,
  GetHouseManagementsRequestPayload,
} from './soiReportService.types';
import queryString from 'query-string';
import { downloadURI } from 'utils/downloadByURL';

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
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: payload,
  });
};
