import { axios } from 'api/axios';
import { ErpApplicationResponse } from 'api/types';

export  const getApplicationInfo = (taskId: number): Promise<ErpApplicationResponse> =>
  axios.get(`Tasks/${taskId}/application`);
