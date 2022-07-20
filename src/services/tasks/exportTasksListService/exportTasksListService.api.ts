import { axios } from './../../../01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import {
  ExportTasksListRequestPayload,
  ExportTaskType,
} from './exportTasksListService.types';

export const downloadTasksList = async ({
  type,
  name,
}: ExportTasksListRequestPayload) => {
  const res: any = await axios.get(
    `Tasks/ExportExecutingIndividualDeviceCheckTasks`,
    {
      responseType: 'blob',
      params: {
        taskType: type,
      },
    }
  );

  const url = window.URL.createObjectURL(new Blob([res]));

  return downloadURI(url, `Список_задач_${name}`);
};

export const fetchExportTaskFilters = (): Promise<ExportTaskType[]> =>
  axios.get('Tasks/ExportExecutingIndividualDeviceCheckTaskFilters');
