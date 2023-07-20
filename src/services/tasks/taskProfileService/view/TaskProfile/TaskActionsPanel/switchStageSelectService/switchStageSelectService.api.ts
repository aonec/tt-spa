import { axios } from 'api/axios';
import { StageListResponseWrappedListResponse } from 'api/myApi';

export const getNextStages = (
  taskId: number,
): Promise<StageListResponseWrappedListResponse> =>
  axios.get(`tasks/${taskId}/NextStages`);
