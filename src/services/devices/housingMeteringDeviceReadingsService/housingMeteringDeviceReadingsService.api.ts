import { axios } from '01/axios';
import { GetHousingMeteringDeviceReadingsResponse } from 'myApi';

export const fetchHousingMeteringDeviceReadings = (
  nodeId: number
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', { params: { nodeId } });
