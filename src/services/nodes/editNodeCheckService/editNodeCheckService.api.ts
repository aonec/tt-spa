import { axios } from 'api/axios';
import { UpdateNodeCheckPayload } from './editNodeCheckService.types';

export const fetchUpdateNodeCheck = ({
  nodeId,
  checkId,
  ...payload
}: UpdateNodeCheckPayload): Promise<void> =>
  axios.put(`Nodes/${nodeId}/Checks/${checkId}`, payload);
