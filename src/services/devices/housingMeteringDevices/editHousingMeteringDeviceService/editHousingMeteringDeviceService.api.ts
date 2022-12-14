import { axios } from '01/axios';
import { UpdatePipeHousingMeteringDeviceRequest } from 'myApi';

export async function putHousingMeteringDevice(
  deviceId: number,
  request: UpdatePipeHousingMeteringDeviceRequest
) {
  return await axios.put<number, UpdatePipeHousingMeteringDeviceRequest>(
    `PipeHousingMeteringDevices/${deviceId}`,
    request
  );
}
