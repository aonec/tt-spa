import axios from '../../api/axios';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
} from '../../api/types';

export const getServiceZones = (): Promise<NodeServiceZoneListResponse> =>
  axios.get('NodeServiceZones');

export const addServiceZone = (serviceZoneName: string) =>
  axios.post<any, NodeServiceZoneResponse>('NodeServiceZones', {
    name: serviceZoneName,
  });
