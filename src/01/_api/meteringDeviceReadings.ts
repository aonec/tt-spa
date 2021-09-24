import axios from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  UpdateHousingMeteringDeviceReadingsRequest,
} from 'myApi';

export async function getMeteringDeviceReadings(
  nodeId: number
): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse[]> {
  const res: any = await axios.get('HousingMeteringDeviceReadings', {
    params: { nodeId },
  });

  return res.items;
}

export async function postMeteringDeviceReading(
  payload: CreateHousingMeteringDeviceReadingsRequest
) {
  return await axios.post('HousingMeteringDeviceReadings', payload);
}

export async function putMeteringDeviceReading(
  payload: UpdateHousingMeteringDeviceReadingsRequest
) {
  return await axios.post('HousingMeteringDeviceReadings', payload);
}
