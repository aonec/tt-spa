import axios from '../../../../../axios';

export async function deregisterDevice(form = {}) {
  try {
    alert('Отправляется запрос на снятие прибора с учета !');
    const res = await axios.post('MeteringDevices/close', form);
    alert('Вычислитель успешно снят с учета !');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}

export async function getCalculator(id = null) {
  try {
    console.log('Отправляется запрос на устройство !');
    const res = await axios.get(`Calculators/${id}`);
    console.log('Вычислитель успешно получен !');
    return res;
  } catch (error) {
    console.log('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}
