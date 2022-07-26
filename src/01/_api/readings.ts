import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse,
} from '../../api/types';
import axios from '../../api/axios';

export const getReadingsHistory = (
  deviceId: number
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/${deviceId}/readingsHistory`);
};

export const createReading = async (
  requestPayload: IndividualDeviceReadingsCreateRequest
): Promise<IndividualDeviceReadingsCreateListResponse> =>
  axios.post(`IndividualDeviceReadings/createLite`, requestPayload);
