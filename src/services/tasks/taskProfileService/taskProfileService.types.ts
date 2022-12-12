import { StagePushRequest, TaskResponse } from 'myApi';

export type AddCommentRequest = {
  taskId: number;
  comment: string;
};

export type PushStageRequestPayload = {
  taskId: number;
  data: StagePushRequest;
};
