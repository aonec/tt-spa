import { axios } from '01/axios';
import { GetHousingMeteringDeviceReadingsResponse } from 'myApi';

export const fetchOldReadings = (
  nodeId: number
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', {
    params: {
      nodeId,
    },
  });
