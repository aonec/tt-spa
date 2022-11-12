import { axios } from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
} from 'myApi';

export const fetchHousingMeteringDeviceReadings = (
  nodeId: number
): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', { params: { nodeId } });

export const createHousingMeteringDeviceReading = (
  reading: CreateHousingMeteringDeviceReadingsRequest
): Promise<void> => axios.post('HousingMeteringDeviceReadings', reading);
