import axios from '../../axios';
import {
  CalculatorResponse,
  NodeResponse,
  TasksPagedList,
} from '../../../myApi';

export async function getNode(id: number) {
  try {
    const res = await axios.get<any, NodeResponse | null>(`Nodes/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'node',
      message: 'Произошла ошибка запроса узла',
    };
  }
}

export async function getCalculator(id: number) {
  try {
    const res = await axios.get<any, CalculatorResponse>(`Calculators/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса вычислителя',
    };
  }
}

export async function getNodeTasks(id: number) {
  try {
    const res = await axios.get<any, TasksPagedList>(
      `Tasks?GroupType=2&NodeId=${id}`
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
