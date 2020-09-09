import axios from '01/axios';

const URL = 'HousingStocks';

export async function getInfo(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/${url}`);
    // console.log('res', res);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {
    console.log(error);
    throw { resource: 'device', message: 'Произошла ошибка запроса устройства' };
  }
}

const housingStocksURL = 'HousingStocks';
export async function getObjectOfDevice(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    // console.log('url', url);
    const res = await axios.get(`${housingStocksURL}/${url}`);
    return res;
  } catch (error) {
    console.log(error);
    throw 'building';
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
    throw 'tasks';
  }
}

// Поиск связанных устройств
// http://transparent-staging.herokuapp.com/api/MeteringDevices/related?DeviceId=1469976
export async function getRelatedDevices(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/related?DeviceId=${url}`);
    // console.log('res', res);
    //  return { ...res, info: true, header: createTitleObject(res) };
    return res;
  } catch (error) {
    console.log(error);
    throw 'related';
  }
}

export async function getTypeODPU(url = '') {
  try {
    const res = await axios.get(`MeteringDevices/${url}`);
    console.log(res.type);
    return res.type;
  } catch (error) {
    console.log(error);
    throw 'typeODPU';
  }
}
