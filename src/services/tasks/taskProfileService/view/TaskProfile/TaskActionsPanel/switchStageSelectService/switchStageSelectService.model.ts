import { createEffect, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import {
  StageListResponse,
  StageListResponseWrappedListResponse,
} from 'api/types';
import { getNextStages } from './switchStageSelectService.api';

const fetchNextStagesFx = createEffect<
  number,
  StageListResponseWrappedListResponse
>(getNextStages);

const NextStagesGate = createGate<{ taskId: number }>();

const $nextStages = createStore<StageListResponse[] | null>(null)
  .on(fetchNextStagesFx.doneData, (_, { items }) => items)
  .reset(NextStagesGate.close);

forward({
  from: NextStagesGate.open.map(({ taskId }) => taskId),
  to: fetchNextStagesFx,
});

export const switchStageSelectService = {
  outputs: { $nextStages: $nextStages.map((items) => items || []) },
  gates: { NextStagesGate },
};
