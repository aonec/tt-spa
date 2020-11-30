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


export async function getOdpu(id = '') {
  try {
    const res = await axios.get(`HousingMeteringDevices/${id}`);
    console.log("getOdpu",res)
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

