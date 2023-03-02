import { stringify } from 'query-string';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import axios from '01/axios';
import { downloadURI } from 'utils/downloadByURL';

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

  return axios.get('Calculators/Export', config);
};

export const downloadDevicesReport = (
  query?: CalculatorsListRequestPayload | null,
) => {
  return requestDevicesReport(query).then((res: any) => {
    const url = window.URL.createObjectURL(new Blob([res]));

    downloadURI(url, 'Список ОДПУ');
  });
};
