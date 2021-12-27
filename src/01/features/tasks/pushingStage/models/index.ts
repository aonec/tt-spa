import { createEffect } from 'effector';
import { StagePushRequest } from 'myApi';

export interface PushStageParams {
  taskId: number;
  payload: StagePushRequest;
}

export const pushStageFx = createEffect<PushStageParams, void>(); 