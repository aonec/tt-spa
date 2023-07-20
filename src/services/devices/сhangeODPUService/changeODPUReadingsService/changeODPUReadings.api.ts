import { axios } from 'api/axios';
import { GetHousingMeteringDeviceReadingsResponse } from 'myApi';

export const fetchOldReadings = (
  nodeId: number,
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', {
    params: {
      nodeId,
    },
  });
