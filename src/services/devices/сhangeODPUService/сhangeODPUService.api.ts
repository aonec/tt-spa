import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { axios } from '01/axios';

export const fetchHousingMeteringDevice = (
  deviceId: number
): Promise<ElectricHousingMeteringDeviceResponse> =>
  axios.get(`ElectricHousingMeteringDevices/${deviceId}`);
