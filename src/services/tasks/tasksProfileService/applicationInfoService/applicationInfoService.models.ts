import { createEffect, createEvent, createStore, sample } from 'effector';
import { getApplicationInfo } from './applicationInfoService.api';
import { ErpApplicationResponse } from 'api/types';

const handleFetchApplicationInfo = createEvent<number>();

const getApplicationInfoFx = createEffect<number, ErpApplicationResponse>(
  getApplicationInfo,
);

const $applicationInfo = createStore<ErpApplicationResponse | null>(null).on(
  getApplicationInfoFx.doneData,
  (_, data) => data,
);

sample({
  clock: handleFetchApplicationInfo,
  target: getApplicationInfoFx,
});

export const applicationInfoService = {
  inputs: { handleFetchApplicationInfo },
  outputs: { $applicationInfo },
};
