import axios from 'axios';

export async function deregisterDevice(form: any) {
  try {
    // alert('Отправляется запрос на снятие прибора с учета !');
    const res = await axios.post('MeteringDevices/close', form);
    alert('Вычислитель успешно снят с учета !');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте еще раз');
    throw error;
  }
}

export async function getCalculator(id: number) {
  try {
    const res = await axios.get(`Calculators/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителя',
    };
  }
}
