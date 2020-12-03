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

export async function getCalculator(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
    console.log('getCalculator', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса Вычислителя',
    };
  }
}

export async function getOdpu(id = '') {
  try {
    const res = await axios.get(`HousingMeteringDevices/${id}`);
    console.log('getOdpu', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

export async function pushStage(id = '', form = {}) {
  try {
    const res = await axios.post(`Tasks/${id}/PushStage`, form);
    console.log('pushStage', res);
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
export async function putCalculator(deviceId = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Calculators/${deviceId}`, form);
    // console.log("putCalculator", form)
    alert('Вычислитель успешно изменен!');
    return res;
  } catch (error) {
    console.log(error);
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
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
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
  }
}

export async function createOdpu(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('HousingMeteringDevices', form);
    // console.log("putCalculator", form)
    alert('ОДПУ успешно создан!');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
  }
}
export async function deregisterDevice(Device = {}) {
  try {
    alert('Отправляется запрос на снятие прибора с учета !');
    const res = await axios.post('MeteringDevices/close', Device);
    alert('Вычислитель успешно снят с учета !');
    return res;
  } catch (error) {
    console.log(error);
    alert('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}

export async function createCalculator(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('Calculators', form);
    // console.log("putCalculator", form)
    alert('Вычислитель успешно создан!');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    alert(
      'Что-то пошло не так: попробуйте проверить все данные',
    );
    throw new Error(error);
  }
}
