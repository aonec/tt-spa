import { axios } from 'api/axios';
import { stringify } from 'query-string';
import { downloadURI } from 'utils/downloadByURL';
import { DevicesReportPayload } from './devicesReportService.types';

export const fetchDownloadDevicesReport = async ({
  title,
  ...params
}: DevicesReportPayload) => {
  const res: string = await axios.get('Calculators/Export', {
    responseType: 'blob',
    params,
    paramsSerializer: (params) => stringify(params),
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, title);
};
