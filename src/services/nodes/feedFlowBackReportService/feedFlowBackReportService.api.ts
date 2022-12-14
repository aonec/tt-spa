import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import { axios } from '01/axios';
import { FeedBackFlowReportPayload } from './feedFlowBackReportService.types';

export const getFeedBackFlowReport = async ({
  Name,
  ...payload
}: FeedBackFlowReportPayload): Promise<void> => {
  const res: string = await axios.get('Reports/FeedBackFlowTemperatureReport', {
    params: payload,
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name);
};
