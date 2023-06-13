import { axios } from '01/axios';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export const fetchReadingsOfElectricNode = async (
  nodeId: number,
): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse[]> => {
  const res: GetHousingMeteringDeviceReadingsResponse = await axios.get(
    'HousingMeteringDeviceReadings',
    {
      params: { nodeId },
    },
  );

  return res?.items || [];
};
