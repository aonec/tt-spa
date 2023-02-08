import { stringify } from 'query-string';

import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';

import axiosWithHeaders from '../axiosWithHeaders';

export const requestDevicesReport = async (
  query?: CalculatorsListRequestPayload | null,
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
    paramsSerializer: (params) => stringify(params || {}),
    responseType: 'blob',
  };

  return axiosWithHeaders.get('Calculators/Export', config);
};

export const downloadDevicesReport = (
  query?: CalculatorsListRequestPayload | null,
) => {
  return requestDevicesReport(query).then((response: any) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'devices-list.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};
