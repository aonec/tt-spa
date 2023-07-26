import { axios } from 'api/axios';
import {
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'api/types';

export const uploadReading = (
  reading: IndividualDeviceReadingsCreateRequest,
): Promise<IndividualDeviceReadingsResponse> =>
  axios.post('IndividualDeviceReadings/createLite', reading);

export const removeReading = (id: number): Promise<void> =>
  axios.post(`IndividualDeviceReadings/${id}/remove`);

export const reopenIndividualDevice = async (deviceId: number) => {
  return await axios.post(`IndividualDevices/${deviceId}/reopen`);
};
