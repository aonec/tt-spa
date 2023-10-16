import { createEffect, createEvent, createStore, sample } from 'effector';
import { getApplicationInfo } from './applicationInfoService.api';
import { ErpApplicationResponse } from 'api/types';
import { createGate } from 'effector-react';

const PageGate = createGate();

const handleFetchApplicationInfo = createEvent<number>();

const getApplicationInfoFx = createEffect<number, ErpApplicationResponse>(
  getApplicationInfo,
);

const $applicationInfo = createStore<ErpApplicationResponse | null>(null)
  .on(getApplicationInfoFx.doneData, (_, data) => data)
  .reset(PageGate.close);

sample({
  clock: handleFetchApplicationInfo,
  target: getApplicationInfoFx,
});

export const applicationInfoService = {
  inputs: { handleFetchApplicationInfo },
  outputs: { $applicationInfo },
  gates: { PageGate },
};
