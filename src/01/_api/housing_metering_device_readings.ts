import axios from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
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

export const updateReadings = (
  query: CreateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.post('HousingMeteringDeviceReadings', {
    params: query,
  });
