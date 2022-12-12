import { axios } from '01/axios';
import { PipeHousingMeteringDeviceResponse } from 'myApi';

export const getDevicePipe = (
  deviceId: number
): Promise<PipeHousingMeteringDeviceResponse> =>
  axios.get(`PipeHousingMeteringDevices/${deviceId}`);
