import axios from '../../axios';

export async function getApartment(id = 0) {
  try {
    const res = await axios.get(`Apartments/${id}`);
    console.log('getApartment', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'apartment',
      message: 'Произошла ошибка запроса квартиры',
    };
  }
}

export async function getTasks(id = 0) {
  try {
    const res = await axios.get(`Tasks?ApartmentId=${id}`);
    console.log('getTasks', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка запроса квартиры',
    };
  }
}

export async function getApartmentDevices(id = '') {
  try {
    const res = await axios.get(`IndividualDevices?ApartmentId=${id}`);
    console.log('getApartmentDevices', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}
