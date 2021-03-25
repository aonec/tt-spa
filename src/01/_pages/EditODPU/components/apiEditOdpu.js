import axios from '../../../axios';

export async function getOdpu(id = '') {
  try {
    const res = await axios.get(`HousingMeteringDevices/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

export async function getCalculators(objid = 0) {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${objid}`);
    console.log('Calculators', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителей в этом доме',
    };
  }
}

export async function putOdpu(deviceId = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`HousingMeteringDevices/${deviceId}`, form);
    // console.log("putCalculator", form)
    alert('ОДПУ успешно изменен!');
    return res;
  } catch (error) {
    console.log(error);
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}

export async function postOdpu(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post(`HousingMeteringDevices`, form);
    // console.log("putCalculator", form)
    alert('ОДПУ успешно создан!');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}
