import { axios } from '01/axios';
import { NodeServiceZoneRequest, NodeServiceZoneResponse } from 'myApi';

export const postNodeServiceZone = (
  payload: NodeServiceZoneRequest,
): Promise<NodeServiceZoneResponse> => axios.post('NodeServiceZones', payload);
