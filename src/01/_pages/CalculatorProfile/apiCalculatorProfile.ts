import axios from '../../axios';
import {
  TasksPagedList,
  TasksPagedListSuccessApiResponse,
} from '../../../myApi';

export async function getCalculator(id: number) {
  try {
    const res = await axios.get(`Calculators/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителя',
    };
  }
}

export async function getCalculatorTasks(id: number) {
  try {
    const res = await axios.get<any, TasksPagedList>(
      `Tasks?GroupType=2&DeviceId=${id}`
    );
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

export async function getUser() {
  try {
    const res = await axios.get(`ManagingFirmUsers/current`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'roles',
      message: 'Произошла ошибка при загрузке данных пользователя',
    };
  }
}
