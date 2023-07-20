import { axios } from 'api/axios';
import { GetHousingMeteringDeviceReadingsResponse } from 'api/myApi';

export const fetchOldReadings = (
  nodeId: number,
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', {
    params: {
      nodeId,
    },
  });
