import { axios } from 'api/axios';
import { NodeServiceZoneRequest, NodeServiceZoneResponse } from 'myApi';

export const postNodeServiceZone = (
  payload: NodeServiceZoneRequest,
): Promise<NodeServiceZoneResponse> => axios.post('NodeServiceZones', payload);
