import { axios } from 'api/axios';
import { ErpExecutorResponse } from 'api/types';

export const getApplicationBrigade = (
  taskId: number,
): Promise<ErpExecutorResponse[]> =>
  axios.get(`Tasks/${taskId}/application/brigade`);
