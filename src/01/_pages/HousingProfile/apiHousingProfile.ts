import axios from '../../axios';
import { HousingMeteringDeviceResponse, TasksPagedList } from '../../../myApi';

export async function getHousingMeteringDevice(id: number) {
  try {
    return await axios.get<HousingMeteringDeviceResponse>(
      `HousingMeteringDevices/${id}`
    );
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getHousingTasks(id: number) {
  try {
    const newURL = `Tasks?DeviceId=${id}`;
    const res: TasksPagedList = await axios.get(newURL);
    const { items } = res;

    return items;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
