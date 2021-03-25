import axios from '../../axios';
import {
  TaskListResponse,
  TasksPagedList,
  TasksPagedListSuccessApiResponse,
} from '../../../myApi';

export async function getHousingMeteringDevice(id: number) {
  try {
    const res = await axios.get(`HousingMeteringDevices/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getHousingTasks(url: string) {
  try {
    const newURL = `Tasks?DeviceId=${url}`;
    const res: TasksPagedList = await axios.get(newURL);
    const { items } = res;
    console.log(items);

    return items;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
