import { axios } from '01/axios';
import {
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'myApi';

export const uploadReading = (
  reading: IndividualDeviceReadingsCreateRequest
): Promise<IndividualDeviceReadingsResponse> =>
  axios.post('IndividualDeviceReadings/createLite', reading);

export const removeReading = (id: number): Promise<void> =>
  axios.post(`IndividualDeviceReadings/${id}/remove`);
