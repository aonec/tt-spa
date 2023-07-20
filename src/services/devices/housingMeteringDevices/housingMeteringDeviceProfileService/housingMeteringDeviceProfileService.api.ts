import { axios } from 'api/axios';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'api/myApi';

export async function getHousingMeteringDevice(id: number) {
  return await axios.get<number, PipeHousingMeteringDeviceResponse>(
    `PipeHousingMeteringDevices/${id}`,
  );
}

export async function getDeviceTasks(id: number) {
  return await axios.get<number, TasksPagedList>(`Tasks?DeviceId=${id}`);
}
