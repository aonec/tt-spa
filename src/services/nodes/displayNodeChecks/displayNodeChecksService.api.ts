import { axios } from '01/axios';
import { NodeCheckResponsePagedList } from 'myApi';

export const fetchNodeChecks = (
  nodeId: number,
): Promise<NodeCheckResponsePagedList> => axios.get(`Nodes/${nodeId}/Checks`);
