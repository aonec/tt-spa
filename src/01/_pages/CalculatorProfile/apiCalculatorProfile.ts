import axios from '../../axios';
import { CalculatorResponse, TasksPagedList } from '../../../myApi';

export async function getCalculator(id: number) {
  try {
    const res = await axios.get<any, CalculatorResponse>(`Calculators/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителя',
    };
  }
}

export async function getCalculatorTasks(id: number) {
  try {
    const res = await axios.get<any, TasksPagedList>(
      `Tasks?GroupType=2&DeviceId=${id}`,
    );
    const { items } = res;
    return items;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
