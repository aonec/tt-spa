import { axios } from 'api/axios';
import queryString from 'query-string';
import { downloadURI } from 'utils/downloadByURL';
import { DevicesReportPayload } from './devicesReportService.types';

export const fetchDownloadDevicesReport = async ({
  title,
  ...params
}: DevicesReportPayload) => {
  const res: string = await axios.get('Calculators/Export', {
    responseType: 'blob',
    params,
    paramsSerializer: (params) => queryString.stringify(params),
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, title);
};
