import { axios } from '../../api/axios';
import { GetHousingMeteringDeviceReadingsResponse } from '../../api/types';

export const fetchOldReadings = (
  nodeId: number
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', {
    params: {
      nodeId,
    },
  });
