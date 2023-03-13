import { axios } from '01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import queryString from 'query-string';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

export const fetchDownloadHeatIndividualDeviceReport = async ({
  Name,
  ...payload
}: HeatIndividualDevicesReportPayload): Promise<void> => {
  const res: string = await axios.get('Reports/FeedBackFlowTemperatureReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, `${Name}.xlsx`);
};
