import { axios } from '01/axios';
import { TaskCommentResponse, TaskResponse } from 'myApi';
import { AddCommentRequest } from './taskProfileService.types';

export const fetchTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);

export const fetchAddComment = ({
  taskId,
  comment,
}: AddCommentRequest): Promise<TaskCommentResponse> =>
  axios.post(`Tasks/${taskId}/Comments`, { comment });

export const fetchDeleteDocument = (id: number): Promise<void> => axios.delete(`Documents/${id}`);
