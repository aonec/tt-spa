import { axios } from '01/axios';
import queryString from 'query-string';
import { FeedFlowTemperatureRequestPayload } from './flowTemperatureDeviationReportService.types';
import { downloadURI } from 'utils/downloadByURL';

export const getFeedFlowPipeTemperatureReport = async ({
  Name,
  ...payload
}: FeedFlowTemperatureRequestPayload): Promise<void> => {
  const res: string = await axios.get('Reports/FeedFlowPipeTemperatureReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name);
};
