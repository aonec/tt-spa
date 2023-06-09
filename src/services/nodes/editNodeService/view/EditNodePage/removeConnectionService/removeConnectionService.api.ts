import { UpdatePipeNodeRequest } from 'myApi';
import { axios } from '01/axios';

export const fetchRemoveConnection = (
  payload: UpdatePipeNodeRequest & { nodeId: number },
): Promise<void> => axios.put(`PipeNodes/${payload.nodeId}`, payload);
