import axios from '01/axios';
import { createTimeline, createTimer, createDevice } from './utils';

const URL = 'HousingStocks';

const replaceURL = (url = '') => url.replace(/objects/, URL);

export async function getInfo(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/${url}`);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {}
}

const housingStocksURL = 'HousingStocks';

export async function getObjectOfDevice(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    // console.log('url', url);
    const res = await axios.get(`${housingStocksURL}/${url}`);
    return res;
  } catch (error) {
  }
}

export async function getODPUTasks(url = '') {
  try {
    const newURL = (`Tasks?DeviceId=${url}`);
    const res = await axios.get(newURL);
    return res;
  } catch (error) {
  }
}

const meteringDevices = 'MeteringDevices';

export async function getDeviceTasks(url = '') {
  try {
    const newURL = (`${meteringDevices}?DeviceId=${url}`);
    const res = await axios.get(newURL);
    return res;
  } catch (error) {
  }
}

export async function getDevices(url = '') {
  try {
    const res = await axios.get(replaceURL(url));
    return res;
  } catch (error) {}
}

export async function getEvents(...ids) {
  try {
    const res = await axios.get('tasks', {
      params: {
        GroupType: 'NotArchived',
        Take: 3,
        HousingStockId: ids[0] ?? null,
        DeviceId: ids[1] ?? null,
      },
    });
    return {
      events: {
        items: res.items.map((item) => ({
          ...item,
          timeline: createTimeline(item),
          timer: createTimer(item),
        })),
        loading: false,
      },
    };
  } catch (error) {}
}
