import { axios } from 'api/axios';
import { TaskCommentRequest, TaskCommentResponse } from 'api/myApi';

export const deleteTaskComment = (params: {
  taskId: number;
  commentId: number;
}): Promise<void> =>
  axios.delete(`Tasks/${params.taskId}/Comments/${params.commentId}`);

export const updateTaskComment = (params: {
  taskId: number;
  commentId: number;
  data: TaskCommentRequest;
}): Promise<TaskCommentResponse> =>
  axios.put(`Tasks/${params.taskId}/Comments/${params.commentId}`, params.data);
