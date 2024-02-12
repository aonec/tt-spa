import { createEffect, createEvent, createStore, sample } from 'effector';
import { addInspector } from './addInspectorService.api';
import { InspectorCreateRequest, InspectorResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const setBuldingId = createEvent<number | null>();

const handleAddInspector = createEvent<InspectorCreateRequest>();

const addInspectorFx = createEffect<
  InspectorCreateRequest,
  InspectorResponse,
  EffectFailDataAxiosError
>(addInspector);

const $isLoading = addInspectorFx.pending;

const $buildingId = createStore<number | null>(null)
  .on(setBuldingId, (_, id) => id)
  .reset(addInspectorFx.doneData);

const $isOpen = $buildingId.map(Boolean);

sample({
  clock: handleAddInspector,
  target: addInspectorFx,
});

const handleSuccessAddInspector = addInspectorFx.doneData;

addInspectorFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const addInspectorService = {
  inputs: { setBuldingId, handleAddInspector, handleSuccessAddInspector },
  outputs: { $isOpen, $isLoading, $buildingId },
};
