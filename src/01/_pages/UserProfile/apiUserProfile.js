/* eslint-disable */

import axios from '../../axios';

export async function getContractor(id = '') {
  try {
    const res = await axios.get(`Contractors/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка запроса Текущего Пользователя',
    };
  }
}

export async function getManagingFirmUsers(id = '') {
  try {
    const res = await axios.get(`OrganizationUsers/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка запроса Текущего Пользователя',
    };
  }
}

export async function getManagingFirmUsersCurrent() {
  try {
    const res = await axios.get('OrganizationUsers/current');
    return res;
  } catch (error) {
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка запроса Текущего Пользователя',
    };
  }
}

export async function putManagingFirmUsersCurrent(id = null, form = {}) {
  alert('Сохранение изменений');
  try {
    const res = await axios.put(`OrganizationUsers/${id}`, form);
    alert('Изменения Текущего Пользователя сохранились');
    return res;
  } catch (error) {
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка редактирования Текущего Пользователя',
    };
  }
}
