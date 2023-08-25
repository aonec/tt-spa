import { axios } from 'api/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'api/types';

export const fetchHousingMeteringDeviceReadings = (
  nodeId: number,
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', { params: { nodeId } });

export const createHousingMeteringDeviceReading = (
  reading: CreateHousingMeteringDeviceReadingsRequest,
): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse> =>
  axios.post('HousingMeteringDeviceReadings', reading);
