import { createEffect, createEvent, createStore, sample } from 'effector';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ErpApplicationResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import {
  deleteApplication,
  getApplicationInfo,
} from './applicationInfoService.api';

const PageGate = createGate();

const handleFetchApplicationInfo = createEvent<number>();

const handleDelete = createEvent();
const handleSuccessDelete = createEvent<number>();

const getApplicationInfoFx = createEffect<
  number,
  ErpApplicationResponse,
  EffectFailDataAxiosError
>(getApplicationInfo);

const deleteApplicationFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(deleteApplication);

const $applicationInfo = createStore<ErpApplicationResponse | null>(null)
  .on(getApplicationInfoFx.doneData, (_, data) => data)
  .reset(PageGate.close);

const $isLoading = getApplicationInfoFx.pending;

const $taskId = createStore<number | null>(null).on(
  handleFetchApplicationInfo,
  (_, id) => id,
);

sample({
  clock: handleFetchApplicationInfo,
  target: getApplicationInfoFx,
});

sample({
  clock: handleDelete,
  source: $taskId,
  filter: (id) => Boolean(id),
  fn: (id) => id!,
  target: deleteApplicationFx,
});

getApplicationInfoFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

deleteApplicationFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

deleteApplicationFx.doneData.watch(() => {
  message.success('Задача удалена!');
});

const $isDeleting = deleteApplicationFx.pending;

const onSuccessDelete = deleteApplicationFx.doneData;

sample({
  clock: onSuccessDelete,
  source: $taskId,
  filter: (id) => Boolean(id),
  fn: (id) => id!,
  target: handleSuccessDelete,
});

export const applicationInfoService = {
  inputs: {
    handleFetchApplicationInfo,
    handleDelete,
    onSuccessDelete,
    handleSuccessDelete,
  },
  outputs: { $applicationInfo, $isLoading, $isDeleting },
  gates: { PageGate },
};
