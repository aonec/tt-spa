/* eslint-disable */

import {
  ApartmentResponse,
  IndividualDeviceListItemResponsePagedList,
  TasksPagedList,
} from 'myApi';
import axios from '../../axios';

export async function getApartment(id = 0): Promise<ApartmentResponse> {
  try {
    return await axios.get(`Apartments/${id}`);
  } catch (error) {
    throw {
      resource: 'apartment',
      message: 'Произошла ошибка запроса квартиры',
    };
  }
}

export async function getTasks(id = 0): Promise<TasksPagedList> {
  try {
    return await axios.get(`Tasks?ApartmentId=${id}`);
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка запроса квартиры',
    };
  }
}

export async function getApartmentDevices(
  id = ''
): Promise<IndividualDeviceListItemResponsePagedList> {
  try {
    return await axios.get(`IndividualDevices?ApartmentId=${id}`);
  } catch (error) {
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}
