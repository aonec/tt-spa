import axios from '../../axios';

export async function getCurrentManagingFirm() {
  try {
    const res = await axios.get('ManagingFirms/current');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'firm',
      message: 'Произошла ошибка запроса Компании',
    };
  }
}

export async function putCurrentManagingFirm(id = 0, form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`ManagingFirms/${id}`, form);
    alert('Компания успешно изменена!');
    return res;
  } catch (error) {
    console.log(error);
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
  }
}

export const firmTemplate = {
  id: 4,
  name: 'ООО УК"ПЖКХ-17"',
  phoneNumber: null,
  information: null,
  timeZoneOffset: '03:00:00',
};
