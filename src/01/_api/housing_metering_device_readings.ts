import axios from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsResponse,
  UpdateHousingMeteringDeviceReadingsRequest,
} from '../../myApi';

export const postReading = (
  query: CreateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.post('housingMeteringDeviceReadings/CreateOrUpdateLast', query);

export const updateReading = (
  query: UpdateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.put('HousingMeteringDeviceReadings', query);
