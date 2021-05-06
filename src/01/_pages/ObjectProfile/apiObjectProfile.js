import axios from '../../axios';

export async function getCalculators(id = '') {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'calculators',
      message: 'Произошла ошибка запроса вычислителей',
    };
  }
}

export async function getDeviceTasks(id = '') {
  try {
    const res = await axios.get(`Tasks?DeviceId=${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка запроса задач по устройству',
    };
  }
}

export async function getObject(id = '') {
  try {
    const res = await axios.get(`HousingStocks/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'object',
      message: 'Произошла ошибка запроса по дому',
    };
  }
}

export async function getServiceZones(id = '') {
  try {
    const res = await axios.get(`Nodes/GetServiceZones`);
    return res;
  } catch (error) {
    throw {
      resource: 'object',
      message: 'Произошла ошибка запроса по зонам',
    };
  }
}
