import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { getApplicationBrigade } from './selectApplicationWorkerService.api';
import { ErpExecutorResponse } from 'api/types';

const SelectApplicationWorkerGate = createGate<{ taskId: number }>();

const getApplicationBrigadeFx = createEffect<number, ErpExecutorResponse[]>(
  getApplicationBrigade,
);

const $applicationBrigade = createStore<ErpExecutorResponse[]>([]).on(
  getApplicationBrigadeFx.doneData,
  (_, data) => data,
);

sample({
  clock: SelectApplicationWorkerGate.open,
  fn: ({ taskId }) => taskId,
  target: getApplicationBrigadeFx,
});

export const selectApplicationWorkerService = {
  outputs: { $applicationBrigade },
  gates: { SelectApplicationWorkerGate },
};
