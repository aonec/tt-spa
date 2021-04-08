import {
  CalculatorListResponsePagedList,
  CreateCalculatorRequest,
  CreateHousingMeteringDeviceRequest,
  CreateNodeRequest,
  HousingStockResponse,
} from '../../myApi';
import axios from '../axios';

//Создание вычислителя
export async function addCalculator(form: CreateCalculatorRequest) {
  try {
    const res = await axios.post('Calculators', form);
    alert('Вычислитель успешно создан !');
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при создании вычислителя',
    };
  }
}

export async function getObjectCalculators(id: number) {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

export async function getCalculator(id: number) {
  try {
    const res = await axios.get(`Calculators/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function addHousingMeteringDevice(
  form: CreateHousingMeteringDeviceRequest
) {
  try {
    const res = await axios.post('HousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}

export async function getHousingStock(housingStockId: number) {
  try {
    const res: HousingStockResponse = await axios.get(
      `HousingStocks/${housingStockId}`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'housingStock',
      message: 'Произошла ошибка запроса дома',
    };
  }
}

export async function getHousingStockCalculators(id: number) {
  try {
    const res: CalculatorListResponsePagedList = await axios.get(
      `Calculators?Filter.HousingStockId=${id}`
    );
    const { items } = res;
    return items;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'calculators',
      message: 'Произошла ошибка запроса вычислителей',
    };
  }
}

export async function addNode(form: CreateNodeRequest) {
  try {
    const res = await axios.post('Nodes', form);
    alert('Узел успешно создан');
    return res;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка создания Узла!');
    throw {
      resource: 'node',
      message: 'Произошла ошибка создания Узла!',
    };
  }
}
