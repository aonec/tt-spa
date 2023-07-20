import axios from 'api/axios';
import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';

export const createReading = (
  requestPayload: IndividualDeviceReadingsCreateRequest,
): Promise<IndividualDeviceReadingsCreateListResponse> =>
  axios.post(`IndividualDeviceReadings/createLite`, requestPayload);
