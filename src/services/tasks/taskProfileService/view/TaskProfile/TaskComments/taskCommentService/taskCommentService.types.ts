import { TaskCommentResponse } from 'api/types';

export type TaskCommentContainerProps = {
  comment: TaskCommentResponse;
  taskId: string;
};
