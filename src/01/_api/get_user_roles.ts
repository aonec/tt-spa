import axios from '../axios';

export async function getUser() {
  try {
    const res = await axios.get(`OrganizationUsers/current`);
    return res;
  } catch (error) {
    throw {
      resource: 'roles',
      message: 'Произошла ошибка при загрузке данных пользователя',
    };
  }
}
