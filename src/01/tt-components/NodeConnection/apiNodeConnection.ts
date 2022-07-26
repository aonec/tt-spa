import axios from '../../../api/axios';
import { CalculatorResponse } from '.../../api/types';

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
