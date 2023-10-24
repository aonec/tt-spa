import { createEffect, createEvent, createStore, sample } from 'effector';
import { getApplicationInfo } from './applicationInfoService.api';
import { ErpApplicationResponse } from 'api/types';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

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
  outputs: { $applicationInfo },
  gates: { PageGate },
};
