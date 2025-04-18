import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { TasksPagedList } from 'api/types';
import dayjs from 'dayjs';
import { createEffect } from 'effector';
import { ExportTasksListRequestPayload } from 'services/tasks/exportTasksListService/exportTasksListService.types';
import { GetTasksListRequestPayload } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { EffectFailDataAxiosError } from 'types';
import { downloadURI } from 'utils/downloadByURL';

export const tasksCountQuery = createQuery({
  handler: (
    filter: GetTasksListRequestPayload | null,
  ): Promise<TasksPagedList> =>
    axios.get('Tasks', { params: { ...filter, pageSize: 0 } }),
});

export const downloadTasksList = async (
  params: ExportTasksListRequestPayload,
) => {
  const res: string = await axios.get(`Tasks/ExportLite`, {
    responseType: 'blob',
    params: params,
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  const date = dayjs().format('DD-MM-YYYY');

  return downloadURI(url, `Список_задач_${date}`);
};

export const tasksExportQuery = createQuery({
  effect: createEffect<
    ExportTasksListRequestPayload,
    void,
    EffectFailDataAxiosError
  >(downloadTasksList),
});
