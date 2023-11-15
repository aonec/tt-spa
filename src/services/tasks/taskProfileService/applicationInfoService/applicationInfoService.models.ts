import { createEffect, createEvent, createStore, sample } from 'effector';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ErpApplicationResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { getApplicationInfo } from './applicationInfoService.api';

const PageGate = createGate();

const handleFetchApplicationInfo = createEvent<number>();

const setModalOpen = createEvent<boolean>();

const handlePostpone = createEvent<string>();

const getApplicationInfoFx = createEffect<
  number,
  ErpApplicationResponse,
  EffectFailDataAxiosError
>(getApplicationInfo);

const $applicationInfo = createStore<ErpApplicationResponse | null>(null)
  .on(getApplicationInfoFx.doneData, (_, data) => data)
  .reset(PageGate.close);

const $isLoading = getApplicationInfoFx.pending;

const $isPostponeModalOpen = createStore<boolean>(false).on(
  setModalOpen,
  (_, open) => open,
);

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
  inputs: { handleFetchApplicationInfo, setModalOpen, handlePostpone },
  outputs: { $applicationInfo, $isLoading, $isPostponeModalOpen },
  gates: { PageGate },
};
