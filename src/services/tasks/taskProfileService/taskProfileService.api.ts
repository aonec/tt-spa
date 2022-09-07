import { axios } from '01/axios';
import { PipeNodeResponse, TaskResponse } from 'myApi';

export const fetchTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);

export const fetchNode = (nodeId: number): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${nodeId}`);
