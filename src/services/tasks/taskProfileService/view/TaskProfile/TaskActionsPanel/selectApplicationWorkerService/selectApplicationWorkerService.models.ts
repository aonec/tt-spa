import { createEffect, createStore, sample } from 'effector';
import { getApplicationBrigade } from './selectApplicationWorkerService.api';
import { ErpExecutorResponse } from 'api/types';
import { createGate } from 'effector-react';

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
  inputs: {},
  outputs: { $applicationBrigade },
  gates: { SelectApplicationWorkerGate },
};
