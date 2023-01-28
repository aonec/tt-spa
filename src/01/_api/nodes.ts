import axios from '01/axios';
import { NodesPagedList } from 'myApi';
import { GetNodesRequestPayload } from '../features/nodes/displayNodes/models';

export const getNodes = async (
  requestPayload: GetNodesRequestPayload
): Promise<NodesPagedList> => {
  return await axios.get('Nodes', { params: requestPayload });
};
