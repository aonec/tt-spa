import { StagePushRequest } from 'api/types';

export type AddCommentRequest = {
  taskId: number;
  comment: string;
};

export type PushStageRequestPayload = {
  taskId: number;
  data: StagePushRequest;
};
