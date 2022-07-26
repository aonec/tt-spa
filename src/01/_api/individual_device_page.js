/* eslint-disable */

import axios from '../../api/axios';

const URL = 'HousingStocks';

export async function getInfo(url = '') {
  try {
    const res = await axios.get(`MeteringDevices/${url}`);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

const housingStocksURL = 'HousingStocks';
export async function getObjectOfDevice(url = '') {
  try {
    const res = await axios.get(`${housingStocksURL}/${url}`);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getODPUTasks(url = '') {
  try {
    const newURL = `Tasks?DeviceId=${url}`;
    const res = await axios.get(newURL);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
