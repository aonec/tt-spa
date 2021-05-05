import axios from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
  UpdateHousingMeteringDeviceReadingsRequest,
} from '../../myApi';

export const requestReadings = (query: {
  nodeId?: number;
}): Promise<GetHousingMeteringDeviceReadingsResponse> =>
  axios.get('HousingMeteringDeviceReadings', {
    params: query,
  });
//
// CreateHousingMeteringDeviceReadingsRequest,
//     HousingMeteringDeviceReadingsResponse

export const postReading = (
  query: CreateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.post('HousingMeteringDeviceReadings', query);

export const updateReading = (
  query: UpdateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.put('HousingMeteringDeviceReadings', query);
