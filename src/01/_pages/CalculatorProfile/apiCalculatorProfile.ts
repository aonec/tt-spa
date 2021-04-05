import axios from '../../axios';
import { CalculatorResponse, TasksPagedList } from '../../../myApi';

export async function getCalculator(id: number) {
  try {
    const res = await axios.get<CalculatorResponse>(`Calculators/${id}`);
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
