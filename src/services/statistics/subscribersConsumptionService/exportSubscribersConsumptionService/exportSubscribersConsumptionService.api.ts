import { axios } from 'api/axios';
import { ExportSubscribersConsumptionPayload } from './exportSubscribersConsumptionService.types';
import { downloadURI } from 'utils/downloadByURL';

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
