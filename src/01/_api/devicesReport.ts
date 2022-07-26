import qs from 'qs';
import axiosWithHeaders from '../../api/axiosWithHeaders';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';

export const requestDevicesReport = async (
  query?: CalculatorsListRequestPayload
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
    responseType: 'blob',
  };

  return axiosWithHeaders.get('Calculators/Export', config);
};

export const downloadDevicesReport = (
  query?: CalculatorsListRequestPayload
) => {
  return requestDevicesReport(query).then((response: any) => {
    const fileNameWithJunk = response.headers['content-disposition'].split(';');
    const encodedFileName = fileNameWithJunk[2].split("'")[2];
    const decodedFileName = decodeURI(encodedFileName).replace(/%2C/g, ',');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'devices-list.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};
