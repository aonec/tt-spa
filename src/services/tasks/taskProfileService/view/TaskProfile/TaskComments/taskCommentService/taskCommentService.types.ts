import { TaskCommentResponse } from 'api/myApi';

export type TaskCommentContainerProps = {
  comment: TaskCommentResponse;
  taskId: string;
};
