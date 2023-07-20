import { TaskCommentRequest, TaskCommentResponse } from 'api/myApi';

export type CommentProps = {
  comment: TaskCommentResponse;
  handleDelete: (payload: { taskId: number; commentId: number }) => void;
  taskIdNumber: number;
  handleUpdate: (payload: {
    taskId: number;
    commentId: number;
    data: TaskCommentRequest;
  }) => void;
};
