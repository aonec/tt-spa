import { axios } from '01/axios';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'myApi';

export async function getHousingMeteringDevice(id: number) {
  return await axios.get<string, PipeHousingMeteringDeviceResponse>(
    `PipeHousingMeteringDevices/${id}`
  );
}

export async function getHousingTasks(id: number) {
  return await axios.get<string, TasksPagedList>(`Tasks?DeviceId=${id}`);
}
