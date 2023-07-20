import { UpdatePipeNodeRequest } from 'api/types';
import { axios } from 'api/axios';

export const fetchRemoveConnection = (
  payload: UpdatePipeNodeRequest & { nodeId: number },
): Promise<void> => axios.put(`PipeNodes/${payload.nodeId}`, payload);
