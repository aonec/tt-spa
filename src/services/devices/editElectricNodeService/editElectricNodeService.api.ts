import { axios } from '../../api/axios';
import { ElectricHousingMeteringDeviceResponse } from '../../api/types';
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
