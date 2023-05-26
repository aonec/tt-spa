import { axios } from '01/axios';
import { CreateNodeCheckPayload } from './createNodeCheckService.types';

export const fetchCreateNodeCheck = ({
  nodeId,
  ...payload
}: CreateNodeCheckPayload): Promise<void> =>
  axios.post(`Nodes/${nodeId}/Checks`, payload);
