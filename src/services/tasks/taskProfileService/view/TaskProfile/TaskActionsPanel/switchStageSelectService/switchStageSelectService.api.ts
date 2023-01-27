import { axios } from '01/axios';
import { StageListResponseWrappedListResponse } from 'myApi';

export const getNextStages = (
  taskId: number,
): Promise<StageListResponseWrappedListResponse> =>
  axios.get(`tasks/${taskId}/NextStages`);
