import { createEffect, createEvent, createStore, sample } from 'effector';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ErpApplicationResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { getApplicationInfo } from './applicationInfoService.api';

const PageGate = createGate();

const handleFetchApplicationInfo = createEvent<number>();

const getApplicationInfoFx = createEffect<
  number,
  ErpApplicationResponse,
  EffectFailDataAxiosError
>(getApplicationInfo);

const $applicationInfo = createStore<ErpApplicationResponse | null>(null)
  .on(getApplicationInfoFx.doneData, (_, data) => data)
  .reset(PageGate.close);

const $isLoading = getApplicationInfoFx.pending;

sample({
  clock: handleFetchApplicationInfo,
  target: getApplicationInfoFx,
});

getApplicationInfoFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const applicationInfoService = {
  inputs: { handleFetchApplicationInfo },
  outputs: { $applicationInfo, $isLoading },
  gates: { PageGate },
};
