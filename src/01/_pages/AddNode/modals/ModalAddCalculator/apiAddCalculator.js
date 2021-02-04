import axios from '../../../../axios';

export async function addCalculator(form){
  try {
    const res = await axios.post('Calculators', form);
    alert('Вычислитель успешно создан !');
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}