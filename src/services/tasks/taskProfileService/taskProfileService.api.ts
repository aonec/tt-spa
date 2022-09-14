import { axios } from '01/axios';
import { AddCommentRequest } from './taskProfileService.types';
import { PipeNodeResponse, TaskResponse, TaskCommentResponse } from 'myApi';

export const fetchTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);

export const fetchAddComment = ({
  taskId,
  comment,
}: AddCommentRequest): Promise<TaskCommentResponse> =>
  axios.post(`Tasks/${taskId}/Comments`, { comment });

export const fetchDeleteDocument = (id: number): Promise<void> =>
  axios.delete(`Documents/${id}`);

export const fetchNode = (nodeId: number): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${nodeId}`);
