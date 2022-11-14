import { axios } from '01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import { omit } from 'lodash';
import moment from 'moment';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CreateSoiReportRequestPayload,
  GetAddressesRequestPayload,
  GetHouseManagementsRequestPayload,
} from './soiReportService.model.types';

export const getSoiReport = async (
  params: CreateSoiReportRequestPayload
): Promise<void> => {
  const res: string = await axios.get('Reports/SoiReport', {
    params: omit(params, ['ReportName']),
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(
    url,
    `${params.ReportName}_${moment(params.To).format('MMMM_YYYY')}`
  );
};

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
