import axios from '01/axios';
import { NodeServiceZoneListResponse } from '../../myApi';

export const getServiceZones = (): Promise<NodeServiceZoneListResponse> =>
  axios.get('NodeServiceZones');
