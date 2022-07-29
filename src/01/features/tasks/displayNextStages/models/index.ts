import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { StageListResponse } from '../../../../../api/types';

export const $nextStages = createStore<StageListResponse[] | null>(null);

export const fetchNextStagesFx = createEffect<
  number,
  StageListResponse[] | null
>();

export const NextStagesGate = createGate<{ taskId: number }>();
