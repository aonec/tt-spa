import { axios } from '01/axios';
import { IndividualDeviceResponseFromDevicePage } from 'myApi';

const getIndividualDevice = (
  deviceId: number,
): Promise<IndividualDeviceResponseFromDevicePage> =>
  axios.get(`Devices/Individual/${deviceId}`);

export const getIndividualDevicesList = (devicesIds: number[]) => {
  return Promise.all(devicesIds.map(getIndividualDevice));
};
