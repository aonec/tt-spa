import { axios } from '01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import moment from 'moment';
import { ExportTasksListRequestPayload } from './exportTasksListService.types';

export const downloadTasksList = async (
  params: ExportTasksListRequestPayload
) => {
  const res: string = await axios.get(`Tasks/ExportLite`, {
    responseType: 'blob',
    params: params,
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  const date = moment().format('DD-MM-YYYY');

  return downloadURI(url, `Список_задач_${date}`);
};
