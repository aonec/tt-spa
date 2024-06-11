import { axios } from 'api/axios';
import { ErpApplicationResponse } from 'api/types';

export const getApplicationInfo = (
  taskId: number,
): Promise<ErpApplicationResponse> => axios.get(`Tasks/${taskId}/application`);

export const deleteApplication = (taskId: number): Promise<void> =>
  axios.delete(`Tasks/ErpTask/${taskId}`);
