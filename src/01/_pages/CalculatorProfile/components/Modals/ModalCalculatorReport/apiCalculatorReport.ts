import axios from '../../../../../axios';

export async function getArchive(link = '') {
  try {
    const res = await axios.get(link, {
      responseType: 'blob',
    });
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
