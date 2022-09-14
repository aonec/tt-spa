import { message } from 'antd';
import {
  CalculatorListResponsePagedList,
  CalculatorResponse,
  CreateCalculatorRequest,
  CreatePipeHousingMeteringDeviceRequest,
  CreatePipeNodeRequest,
  HousingStockResponse,
  IndividualDeviceResponse,
  PipeNodeResponse,
  TasksPagedList,
  UpdateIndividualDeviceRequest,
  UpdatePipeNodeRequest,
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
    const res = await axios.get(`HousingStocks/${id}/Calculators`);
    return res;
  } catch (error) {
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

export async function getNode(id: number) {
  try {
    const res = await axios.get<any, PipeNodeResponse>(`PipeNodes/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'node',
      message: 'Произошла ошибка запроса узла',
    };
  }
}

export async function getNodeTasks(id: number) {
  try {
    const res = await axios.get<any, TasksPagedList>(
      `Tasks?GroupType=2&NodeId=${id}`
    );
    const { items } = res;
    return items;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}

export async function getIndividualDevice(id: number) {
  try {
    const res = await axios.get<any, IndividualDeviceResponse>(
      `IndividualDevices/${id}`
    );
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getIndividualDeviceTasks(id: number) {
  try {
    const res = await axios.get<any, TasksPagedList>(
      `Tasks?GroupType=2&DeviceId=${id}`
    );
    const { items } = res;
    return items;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}

export async function getCalculator(id: number) {
  try {
    const res = await axios.get<any, CalculatorResponse>(`Calculators/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function addHousingMeteringDevice(
  form: CreatePipeHousingMeteringDeviceRequest
) {
  try {
    const res = await axios.post('PipeHousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
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
    throw {
      resource: 'housingStock',
      message: 'Произошла ошибка запроса дома',
    };
  }
}

export async function getHousingStockCalculators(id: number) {
  try {
    const res: CalculatorListResponsePagedList = await axios.get(
      `HousingStocks/${id}/Calculators`
    );
    const { items } = res;
    return items;
  } catch (error) {
    throw {
      resource: 'calculators',
      message: 'Произошла ошибка запроса вычислителей',
    };
  }
}

export async function addNode(form: CreatePipeNodeRequest) {
  try {
    const res = await axios.post('PipeNodes', form);
    alert('Узел успешно создан');
    return res;
  } catch (error) {
    alert('Произошла ошибка создания Узла!');
    throw {
      resource: 'node',
      message: 'Произошла ошибка создания Узла!',
    };
  }
}

export async function putNode(nodeId: number, form: UpdatePipeNodeRequest) {
  try {
    const res = await axios.put(`PipeNodes/${nodeId}`, form);
    message.success('Узел успешно изменен!');
    return res;
  } catch (error) {
    throw {
      resource: 'node',
      message: 'Произошла ошибка запроса узла',
    };
  }
}

export async function putIndividualDevice(
  deviceId: number,
  form: UpdateIndividualDeviceRequest
) {
  try {
    const res = await axios.put(`IndividualDevices/${deviceId}`, form);
    return res;
  } catch (error) {
    throw error;
  }
}
