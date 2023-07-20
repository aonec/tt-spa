import { axios } from 'api/axios';
import { NodeCheckResponsePagedList } from 'api/myApi';

export const fetchNodeChecks = (
  nodeId: number,
): Promise<NodeCheckResponsePagedList> => axios.get(`Nodes/${nodeId}/Checks`);
