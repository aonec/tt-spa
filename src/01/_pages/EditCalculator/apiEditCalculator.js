import axios from '../../axios';

export async function getCalculator(id = '') {
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

export async function putCalculator(deviceId = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Calculators/${deviceId}`, form);
    alert('Вычислитель успешно изменен!');
    return res;
  } catch (error) {
    console.log(error);
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
  }
}
