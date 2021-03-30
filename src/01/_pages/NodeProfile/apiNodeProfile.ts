import axios from '../../axios';
import { CalculatorResponse, NodeResponse } from '../../../myApi';

export async function getNode(id: number) {
  try {
    const res = await axios.get<any, any>(`Nodes/${id}`);
    debugger;
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
      message: 'Произошла ошибка запроса устройства',
    };
  }
}
