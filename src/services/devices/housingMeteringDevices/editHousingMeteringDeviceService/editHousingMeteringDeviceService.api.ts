import { axios } from '01/axios';
import {
  MeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';

export async function putHousingMeteringDevice(params: {
  deviceId: number;
  request: UpdatePipeHousingMeteringDeviceRequest;
}) {
  return await axios.put<
    {
      deviceId: number;
      request: UpdatePipeHousingMeteringDeviceRequest;
    },
    MeteringDeviceResponse
  >(`PipeHousingMeteringDevices/${params.deviceId}`, params.request);
}
