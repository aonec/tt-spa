import axios from '../../api/axios';
import { NodesPagedList } from '../../api/types';
import { GetNodesRequestPayload } from '../features/nodes/displayNodes/models';

export const getNodes = async (
  requestPayload: GetNodesRequestPayload
): Promise<NodesPagedList> => {
  return await axios.get('Nodes', { params: requestPayload });
};
