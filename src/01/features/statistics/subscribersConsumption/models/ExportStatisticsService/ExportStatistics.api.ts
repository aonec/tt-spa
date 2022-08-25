import { axios } from '01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import moment from 'moment';
import { StatsisticsPayload } from '..';

export const downloadStatistics = async (params: StatsisticsPayload) => {
  const res: string = await axios.get(`SubscriberStatistics/Export`, {
    responseType: 'blob',
    params: params,
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  const date = moment().format('DD-MM-YYYY');

  return downloadURI(url, `Статистика-${date}`);
};
