import axios from '../../../../axios';

export async function getClosedDevices(url = '') {
  try {
    const res = await axios.get('MeteringDevices/search?Status=Closed');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
