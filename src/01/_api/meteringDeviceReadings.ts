import axios from '01/axios';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';

export async function getMeteringDeviceReadings(
  nodeId: number
): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse[]> {
  const res: any = await axios.get('HousingMeteringDeviceReadings', {
    params: { nodeId },
  });

  return res.items;
}
