/* eslint-disable */

import axios from '../../axios';

export async function getCurrentManagingFirm() {
  try {
    const res = await axios.get('Organizations/current');
    return res;
  } catch (error) {
    throw {
      resource: 'firm',
      message: 'Произошла ошибка запроса Компании',
    };
  }
}

export async function getManagingFirmUsers() {
  try {
    const res = await axios.get('OrganizationUsers');
    return res;
  } catch (error) {
    throw {
      resource: 'firmusers',
      message: 'Произошла ошибка запроса Списка Сотрудников',
    };
  }
}

export async function getContractors() {
  try {
    const res = await axios.get('Contractors');
    return res;
  } catch (error) {
    throw {
      resource: 'contractors',
      message: 'Произошла ошибка запроса Списка Подрядчиков',
    };
  }
}

export async function putCurrentManagingFirm(id = 0, form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Organizations/${id}`, form);
    alert('Компания успешно изменена!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}

export async function postContractor(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('Contractors', form);
    alert('Подрядчик успешно создан!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}

export async function postStaff(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('OrganizationUsers', form);
    alert('Сотрудник успешно создан!');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    alert(
      'Что-то пошло не так: скорее всего уже есть пользователь с таким email \n' +
        handleError.Message
    );
    // throw new Error(error);
  }
}

export const firmTemplate = {
  id: 4,
  name: 'ООО УК"ПЖКХ-17"',
  phoneNumber: null,
  information: null,
  timeZoneOffset: '03:00:00',
};
