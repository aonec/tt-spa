import { axios } from '01/axios';
import { PipeNodeResponse } from 'myApi';

export const fetchNode = (nodeId: string): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${nodeId}`);
