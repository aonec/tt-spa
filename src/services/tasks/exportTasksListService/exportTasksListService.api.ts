import { axios } from './../../../01/axios';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';
import {
  ExportTasksListRequestPayload,
  TaskType,
} from './exportTasksListService.types';

const exportUrlTasksLookup = {
  [TaskType.CheckIndividualDevices]:
    'Tasks/ExportExecutingIndividualDeviceCheckTasks',
};

export const downloadTasksList = async ({
  type,
}: ExportTasksListRequestPayload) => {
  const res: any = await axios.get(exportUrlTasksLookup[type], {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  return downloadURI(url, 'Список_задач_Проверка_ИПУ');
};
