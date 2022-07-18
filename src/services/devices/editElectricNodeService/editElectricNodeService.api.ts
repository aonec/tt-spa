import { axios } from '01/axios';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { UpdateElectricHousingMeteringDevice } from './view/EditElectricNodePage/EditElectricNodePage.types';

export const fetchElectricNode = (
  nodeId: number
): Promise<ElectricHousingMeteringDeviceResponse> =>
  axios.get(`ElectricHousingMeteringDevices/${nodeId}`);

export const updateElectricHousingMeteringDevice = (
  device: UpdateElectricHousingMeteringDevice
): Promise<void> =>
  axios.put(`ElectricHousingMeteringDevices/${device.deviceId}`, null, {
    params: { ...device },
  });
