import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  StageListResponse,
  StageListResponseWrappedListResponse,
} from 'api/myApi';
import { getNextStages } from './switchStageSelectService.api';

const domain = createDomain('switchStageSelectService');

const fetchNextStagesFx = domain.createEffect<
  number,
  StageListResponseWrappedListResponse
>(getNextStages);

const NextStagesGate = createGate<{ taskId: number }>();

const $nextStages = domain
  .createStore<StageListResponse[] | null>(null)
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
