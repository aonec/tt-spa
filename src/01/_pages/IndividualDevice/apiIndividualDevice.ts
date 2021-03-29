import axios from '../../axios';
import { TasksPagedList } from '../../../myApi';

export async function getIndividualDevice(id: number) {
  try {
    const res = await axios.get(`IndividualDevices/${id}`);
    // console.log(`IndividualDevices/${id}`, res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getIndividualDeviceTasks(id: number) {
  try {
    const res: TasksPagedList = await axios.get(`Tasks?DeviceId=${id}`);
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
