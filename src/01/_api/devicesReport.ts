import {
  ECalculatorOrderRule,
  EExpiresCheckingDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  EOrderByRule,
  EResourceType,
} from '../../myApi';
import qs from 'qs';
import axiosWithHeaders from '../axiosWithHeaders';

export type RequestDevicesReportQueryType = {
  'Filter.DiameterRange.From'?: number | null;
  'Filter.DiameterRange.To'?: number | null;
  'Filter.ExpiresCheckingDateAt'?: EExpiresCheckingDateAt;
  'Filter.Resource'?: EResourceType;
  'Filter.Model'?: string | null;
  'Filter.CommercialDateRange.From'?: string | null;
  'Filter.CommercialDateRange.To'?: string | null;
  'Filter.Address.City'?: string | null;
  'Filter.Address.Street'?: string | null;
  'Filter.Address.HousingStockNumber'?: string | null;
  'Filter.Address.Corpus'?: string | null;
  'Filter.Address.HouseCategory'?: EHouseCategory;
  'Filter.HousingStockId'?: number | null;
  'Filter.NodeStatus'?: ENodeCommercialAccountStatus;
  Question?: string | null;
  OrderRule?: ECalculatorOrderRule;
  IsConnected?: boolean | null;
  CountTasks?: boolean | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export const requestDevicesReport = async (
  query?: RequestDevicesReportQueryType
): Promise<File | null> => {
  const config: Partial<
    {
      params: typeof query;
      paramsSerializer: (params: typeof query) => string;
    } & {
      responseType: 'blob';
    }
  > = {
    params: query,
    paramsSerializer: (params) => qs.stringify(params),
  };

  return axiosWithHeaders.get('Calculators/Export', config);
};

export const downloadDevicesReport = (
  query?: RequestDevicesReportQueryType
) => {
  return requestDevicesReport(query).then((response: any) => {
    const fileNameWithJunk = response.headers['content-disposition'].split(';');
    const encodedFileName = fileNameWithJunk[2].split("'")[2];
    const decodedFileName = decodeURI(encodedFileName).replace(/%2C/g, ',');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodedFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};
