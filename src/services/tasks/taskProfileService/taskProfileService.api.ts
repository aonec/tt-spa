import { axios } from 'api/axios';
import {
  AddCommentRequest,
  PushStageRequestPayload,
} from './taskProfileService.types';
import { PipeNodeResponse, TaskResponse, TaskCommentResponse } from 'api/types';

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

export const postPushStage = ({
  taskId,
  data,
}: PushStageRequestPayload): Promise<TaskResponse> =>
  axios.post(`Tasks/${taskId}/PushStage`, data);

export const revertStage = (taskId: number): Promise<TaskResponse> =>
  axios.post(`Tasks/${taskId}/RevertStage`, {});
