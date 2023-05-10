import { axios } from '01/axios';
import { removeNodeCheckPayload } from './removeNodeCheckService.types';

export const fetchRemoveNodeCheck = ({
  checkId,
  nodeId,
}: removeNodeCheckPayload): Promise<void> =>
  axios.delete(`Nodes/${nodeId}/Checks/${checkId}`);
