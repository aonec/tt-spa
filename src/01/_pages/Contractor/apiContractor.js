/* eslint-disable */

import axios from '../../axios';

export async function getContractor(id = '') {
  try {
    const res = await axios.get(`Contractors/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка запроса Текущего Подрядчика',
    };
  }
}

export async function putContractor(id = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Contractors/${id}`, form);
    alert('Подрядчик успешно изменен!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}
