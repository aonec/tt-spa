import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse,
} from './../../myApi';
import axios from 'api/axios';

export const getReadingsHistory = (
  deviceId: number,
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/${deviceId}/readingsHistory`);
};

export const createReading = async (
  requestPayload: IndividualDeviceReadingsCreateRequest,
): Promise<IndividualDeviceReadingsCreateListResponse> => {
  try {
    return await axios.post(
      `IndividualDeviceReadings/createLite`,
      requestPayload,
    );
  } catch (e) {
    throw e;
  }
};
