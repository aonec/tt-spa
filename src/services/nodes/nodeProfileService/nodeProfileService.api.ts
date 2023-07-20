import { axios } from 'api/axios';
import { PipeNodeResponse } from 'myApi';

export const getPipeNode = (pipeNodeId: number): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${pipeNodeId}`);
