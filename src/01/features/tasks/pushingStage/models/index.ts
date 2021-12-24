import { createEffect } from 'effector';
import { StagePushRequest } from 'myApi';

export interface PushStageParams {
  taskId: number;
  data: StagePushRequest | null;
}

export const pushStageFx = createEffect<PushStageParams, void>(); 