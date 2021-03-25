import axios from '../../axios';

export async function confirmRegistration(form) {
  alert('Попытка подтверждения пользователя');
  try {
    const res = await axios.post(`Auth/confirm`, form);
    alert('Успешная попытка подтверждения пользователя');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка подтверждения пользователя',
    };
  }
}
