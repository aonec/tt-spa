import { axios } from 'api/axios';
import {
  IndividualDeviceConsumptionResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'api/types';
import { IndividualDeviceConsumptionForGraph } from './individualDevicesListService.types';

const getIndividualDevice = (
  deviceId: number,
): Promise<IndividualDeviceResponseFromDevicePage> =>
  axios.get(`Devices/Individual/${deviceId}`);

export const getIndividualDevicesList = (devicesIds: number[]) => {
  return Promise.all(devicesIds.map(getIndividualDevice));
};

const getDeviceConsumption = async (
  deviceId: number,
): Promise<IndividualDeviceConsumptionForGraph | null> => {
  try {
    const res: IndividualDeviceConsumptionResponse[] = await axios.get(
      `IndividualDevices/${deviceId}/Consumption`,
    );
    return { consumptions: res, deviceId };
  } catch {
    return null;
  }
};

export const getIndividualDeviceConsumptionsList = (
  devicesIds: number[],
): Promise<(IndividualDeviceConsumptionForGraph | null)[]> => {
  return Promise.all(devicesIds.map(getDeviceConsumption));
};
