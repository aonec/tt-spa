import { downloadTasksList } from './exportTasksListService.api';
import { message } from 'antd';
import { createDomain, sample } from 'effector';
import { ExportTasksListRequestPayload } from './exportTasksListService.types';
import { tasksProfileService } from '../tasksProfileService';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('exportTasksListService');

const exportTasksListFx = domain.createEffect<
  ExportTasksListRequestPayload,
  void,
  EffectFailDataAxiosError
>(downloadTasksList);
const exportTasksList = domain.createEvent();

const $isLoading = exportTasksListFx.pending;

sample({
  source: tasksProfileService.outputs.$searchState,
  clock: exportTasksList,
  fn: (payload): ExportTasksListRequestPayload => {
    return { ...payload, PageSize: 20 };
  },
  target: exportTasksListFx,
});

exportTasksList.watch(() => message.info('Выгрузка задач...'));

exportTasksListFx.done.watch(() =>
  message.success('Список задач успешно выгружен!')
);

export const exportTasksListService = {
  inputs: {
    exportTasksList,
  },
  outputs: {
    $isLoading,
  },
};
