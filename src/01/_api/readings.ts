import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse,
} from './../../myApi';
import axios from '01/axios';

export const getReadingsHistory = (
  deviceId: number
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/${deviceId}/readingsHistory`);
};

export const createReading = async (
  requestPayload: IndividualDeviceReadingsCreateRequest
): Promise<IndividualDeviceReadingsCreateListResponse> =>
  axios.post(`IndividualDeviceReadings/create`, requestPayload);
