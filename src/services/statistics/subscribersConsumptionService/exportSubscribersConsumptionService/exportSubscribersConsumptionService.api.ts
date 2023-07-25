import { axios } from 'api/axios';
import { downloadURI } from 'services/reports/CreateReportModal/utils';
import { ExportSubscribersConsumptionPayload } from './exportSubscribersConsumptionService.types';

export const downloadSubscribersConsumption = async (
  payload: ExportSubscribersConsumptionPayload,
) => {
  const { params, fileName } = payload;
  const res: string = await axios.get(`SubscriberStatistics/Export`, {
    responseType: 'blob',
    params: params,
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  return downloadURI(url, `${fileName}`);
};
