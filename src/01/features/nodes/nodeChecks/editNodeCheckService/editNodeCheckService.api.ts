import { axios } from '01/axios';
import { UpdateNodeCheckPayload } from './editNodeCheckService.types';

export const fetchUpdateNodeCheck = ({
  nodeId,
  ...payload
}: UpdateNodeCheckPayload): Promise<void> =>
  axios.put(`Nodes/${nodeId}/Checks`, payload);
