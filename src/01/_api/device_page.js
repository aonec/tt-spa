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


export async function getInfo(typeODPU, deviceId) {
  let deviceTypeURL = typeODPU === 'Calculator' ? 'Calculators' : 'HousingMeteringDevices'
  try {
    const res = await axios.get(`${deviceTypeURL}/${deviceId}`);
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
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}

export async function getRelatedDevices(url = '') {
  try {
    const res = await axios.get(`MeteringDevices/related?DeviceId=${url}`);
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
    return res.type;
  } catch (error) {
    console.log(error);
    throw {
      typeODPU: 'related',
      message: 'Произошла ошибка при загрузке данных по типу устройства',
    };
  }
}

export async function getCalculatorResources(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
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
