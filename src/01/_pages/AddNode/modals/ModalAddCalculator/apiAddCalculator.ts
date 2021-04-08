import axios from '../../../../axios';
import { CreateCalculatorRequest } from '../../../../../myApi';

export async function addCalculator(form: CreateCalculatorRequest) {
  try {
    const res = await axios.post('Calculators', form);
    alert('Вычислитель успешно создан !');
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при создании вычислителя',
    };
  }
}
