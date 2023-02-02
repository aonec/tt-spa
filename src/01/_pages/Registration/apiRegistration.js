import { message } from 'antd';
import axios from '../../axios';

export async function confirmRegistration(form) {
  message.info('Попытка подтверждения пользователя');
  try {
    const res = await axios.post(`Auth/confirm`, form);
    message.success('Успешная попытка подтверждения пользователя');
    return res;
  } catch (error) {
    message.error('Произошла ошибка подтверждения пользователя');
    throw {
      resource: 'device',
      message: 'Произошла ошибка подтверждения пользователя',
    };
  }
}
