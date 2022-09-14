import { axios } from '01/axios';
import { TaskResponse } from 'myApi';

export const fetchTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);
