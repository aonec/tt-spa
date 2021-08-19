import { IndividualDeviceReadingsHistoryResponse } from './../../myApi';
import axios from '01/axios';

export const getReadingsHistory = (
  deviceId: number
): Promise<IndividualDeviceReadingsHistoryResponse> => {
  return axios.get(`IndividualDevices/readingHistory?deviceId=${deviceId}`);
};
