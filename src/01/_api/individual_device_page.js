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
    throw new Error(error)
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
    throw new Error(error)
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
    throw new Error(error)
  }
}
