import { axios } from 'api/axios';
import { CreateNodeCheckPayload } from './createNodeCheckService.types';

export const fetchCreateNodeCheck = ({
  nodeId,
  ...payload
}: CreateNodeCheckPayload): Promise<void> =>
  axios.post(`Nodes/${nodeId}/Checks`, payload);
