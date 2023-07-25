import axios from 'axios';
import { IndividualDeviceReadingsHistoryResponse } from 'api/types';

export const getReadingsHistory = (
  deviceId: number,
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/${deviceId}/readingsHistory`);
};
