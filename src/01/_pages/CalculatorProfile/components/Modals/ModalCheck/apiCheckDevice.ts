import axios from '../../../../../axios';

export async function checkDevice(form={}) {
  try {
    alert('Отправляется запрос изменение дат поверки !');
    const res = await axios.post('MeteringDevices/check', form);
    alert('Изменение дат поверки прошло успешно!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}

