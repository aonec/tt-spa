import axios from 'axios';
import { IndividualDeviceReadingsHistoryResponse } from 'myApi';

export const getReadingsHistory = (
  deviceId: number,
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/${deviceId}/readingsHistory`);
};
