import axios from '../../../axios';
import { CalculatorResponse, UpdateCalculatorRequest } from '../../../../myApi';

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

export async function putCalculator(
  deviceId: number,
  form: UpdateCalculatorRequest
) {
  try {
    const res = await axios.put(`Calculators/${deviceId}`, form);
    alert('Вычислитель успешно изменен!');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    const { Data } = handleError;
    const { Id } = Data;
    return { show: true, id: Id };
  }
}
