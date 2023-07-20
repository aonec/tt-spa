import { axios } from 'api/axios';
import { NodeServiceZoneRequest, NodeServiceZoneResponse } from 'api/types';

export const postNodeServiceZone = (
  payload: NodeServiceZoneRequest,
): Promise<NodeServiceZoneResponse> => axios.post('NodeServiceZones', payload);
