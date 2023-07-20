import { axios } from 'api/axios';
import { NodeCheckResponsePagedList } from 'myApi';

export const fetchNodeChecks = (
  nodeId: number,
): Promise<NodeCheckResponsePagedList> => axios.get(`Nodes/${nodeId}/Checks`);
