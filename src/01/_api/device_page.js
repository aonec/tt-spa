import axios from '01/axios';

const URL = 'HousingStocks';

export async function getDevice(url = '') {
  try {
    const res = await axios.get(`MeteringDevices/${url}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getODPU(url = '') {
  try {
    const res = await axios.get(`HousingMeteringDevices/${url}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

export async function getInfo(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/${url}`);
    console.log('res', res);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

const housingStocksURL = 'HousingStocks';

export async function getObjectOfDevice(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    // console.log('url', url);
    const res = await axios.get(`${housingStocksURL}/${url}`);
    console.log("getObjectOfDevice", res)
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'building',
      message: 'Произошла ошибка при загрузке данных по зданию',
    };
  }
}

export async function getODPUTasks(url = '') {
  try {
    const newURL = `Tasks?DeviceId=${url}`;
    const res = await axios.get(newURL);
    // console.log('getODPUTasks', res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}

// Поиск связанных устройств
// http://transparent-staging.herokuapp.com/api/MeteringDevices/related?DeviceId=1469976
export async function getRelatedDevices(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/related?DeviceId=${url}`);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'related',
      message:
        'Произошла ошибка при загрузке данных по подключенным устройствам',
    };
  }
}

export async function getTypeODPU(url = '') {
  try {
    const res = await axios.get(`MeteringDevices/${url}`);
    // console.log(res.type);
    return res.type;
  } catch (error) {
    console.log(error);
    throw {
      typeODPU: 'related',
      message: 'Произошла ошибка при загрузке данных по типу устройства',
    };
  }
}

// Получить ресурсы Вычислителя
export async function getCalculatorResources(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
    console.log(res);
    return res.hubs;
  } catch (error) {
    console.log(error);
    throw {
      typeODPU: 'getCalculatorResources',
      message: 'Произошла ошибка при загрузке ресурсов вычислителя',
    };
  }
}

export async function getCalculator(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
    console.log(res);
    return res.model;
  } catch (error) {
    console.log(error);
    throw {
      typeODPU: 'getCalculatorResources',
      message: 'Произошла ошибка при загрузке ресурсов вычислителя',
    };
  }
}

export async function getPagination(id = '') {
  try {
    const res = await axios.get('MeteringDevices');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      typeODPU: 'getCalculatorResources',
      message: 'Произошла ошибка при загрузке ресурсов вычислителя',
    };
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
