import axios from '../../axios';
import { CalculatorResponse } from '../../../myApi';

export async function getCalculator(id: number) {
  try {
    return await axios.get<CalculatorResponse>(`Calculators/${id}`);
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителя',
    };
  }
}
