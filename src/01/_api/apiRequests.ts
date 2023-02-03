import {
  IndividualDeviceResponse,
  TasksPagedList,
  UpdateIndividualDeviceRequest,
} from '../../myApi';
import axios from '../axios';

export async function getIndividualDevice(id: number) {
  try {
    const res = await axios.get<any, IndividualDeviceResponse>(
      `IndividualDevices/${id}`,
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
      `Tasks?GroupType=2&DeviceId=${id}`,
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

export async function putIndividualDevice(
  deviceId: number,
  form: UpdateIndividualDeviceRequest,
) {
  try {
    const res = await axios.put(`IndividualDevices/${deviceId}`, form);
    return res;
  } catch (error) {
    throw error;
  }
}
