import { createEffect, createEvent } from 'effector';
import { downloadTasksList } from './exportTasksListService.api';
import { message } from 'antd';
import { sample } from 'effector';
import { ExportTasksListRequestPayload } from './exportTasksListService.types';
import { tasksProfileService } from '../tasksProfileService';
import { EffectFailDataAxiosError } from 'types';

const exportTasksListFx = createEffect<
  ExportTasksListRequestPayload,
  void,
  EffectFailDataAxiosError
>(downloadTasksList);
const exportTasksList = createEvent();

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
  message.success('Список задач успешно выгружен!'),
);

exportTasksListFx.failData.watch(async (e) => {
  const data = JSON.parse(
    await (
      e.response.data as unknown as {
        text: () => Promise<string>;
      }
    ).text(),
  );

  message.error(data.error.Text);
});

export const exportTasksListService = {
  inputs: {
    exportTasksList,
  },
  outputs: {
    $isLoading,
  },
};

export const exportTasksService = exportTasksListService;
