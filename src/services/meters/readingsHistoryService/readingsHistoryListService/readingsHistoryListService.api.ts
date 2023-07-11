import axios from '01/axios';
import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';

export const createReading = (
  requestPayload: IndividualDeviceReadingsCreateRequest,
): Promise<IndividualDeviceReadingsCreateListResponse> =>
  axios.post(`IndividualDeviceReadings/createLite`, requestPayload);
