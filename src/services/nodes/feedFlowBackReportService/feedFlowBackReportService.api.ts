import { axios } from 'api/axios';
import { FeedBackFlowReportPayload } from './feedFlowBackReportService.types';
import queryString from 'query-string';
import { downloadURI } from 'utils/downloadByURL';

export const getFeedBackFlowReport = async ({
  Name,
  ...payload
}: FeedBackFlowReportPayload): Promise<void> => {
  const res: string = await axios.get('Reports/FeedBackFlowTemperatureReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name);
};
