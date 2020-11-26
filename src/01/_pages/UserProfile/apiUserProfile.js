import axios from "../../axios";

export async function getManagingFirmUsersCurrent() {
  try {
    const res = await axios.get('ManagingFirmUsers/current');
    console.log('ManagingFirmUsers/current', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка запроса Текущего Пользователя',
    };
  }
}

export async function putManagingFirmUsersCurrent(id= null, form ={}) {
  alert('Сохранение изменений')
  try {
    const res = await axios.put(`ManagingFirmUsers/${id}`, form);
    console.log(`ManagingFirmUsers/${id}`, res);
    alert('Изменения Текущего Пользователя сохранились')
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'firmusercurrent',
      message: 'Произошла ошибка редактирования Текущего Пользователя',
    };
  }
}