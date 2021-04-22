import axios from '01/axios';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
} from '../../myApi';

export const getServiceZones = (): Promise<NodeServiceZoneListResponse> =>
  axios.get<any, NodeServiceZoneListResponse>('NodeServiceZones');

export const addServiceZone = (serviceZoneName: string) =>
  axios.post<any, NodeServiceZoneResponse>('NodeServiceZones', {
    name: serviceZoneName,
  });
