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
    throw new Error(error)
  }
}

export async function getTypeODPU(url = '') {
  try {
    // const res = await axios.get(replaceURL(url));
    const res = await axios.get(`MeteringDevices/${url}`);
    // console.log('res', res);
    //  return { ...res, info: true, header: createTitleObject(res) };
    console.log(res.type)
    return res.type;
    
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}


// import axios from '01/axios';
// import { createTimeline, createTimer, createDevice } from './utils';
//
// // Поиск связанных устройств
// // http://transparent-staging.herokuapp.com/api/MeteringDevices/related?DeviceId=1469976
// export async function getRelatedDevices(url = '') {
//   try {
//     // const res = await axios.get(replaceURL(url));
//     const res = await axios.get(`MeteringDevices/related?DeviceId=${url}`);
//     console.log('res', res);
//     //  return { ...res, info: true, header: createTitleObject(res) };
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// const URL = 'HousingStocks';
//
// const replaceURL = (url = '') => url.replace(/objects/, URL);
//
// export async function getInfo(url = '') {
//   try {
//     // const res = await axios.get(replaceURL(url));
//     const res = await axios.get(`MeteringDevices/${url}`);
//     console.log('res', res);
//     //  return { ...res, info: true, header: createTitleObject(res) };
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// const housingStocksURL = 'HousingStocks';
// export async function getObjectOfDevice(url = '') {
//   try {
//     // const res = await axios.get(replaceURL(url));
//     // console.log('url', url);
//     const res = await axios.get(`${housingStocksURL}/${url}`);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// export async function getODPUTasks(url = '') {
//   try {
//     const newURL = `Tasks?DeviceId=${url}`;
//     const res = await axios.get(newURL);
//     console.log('getODPUTasks', res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// const meteringDevices = 'MeteringDevices';
//
// export async function getDeviceTasks(url = '') {
//   try {
//     const newURL = `${meteringDevices}?DeviceId=${url}`;
//     const res = await axios.get(newURL);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// export async function getDevices(url = '') {
//   try {
//     const res = await axios.get(replaceURL(url));
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// export async function getEvents(...ids) {
//   try {
//     const res = await axios.get('tasks', {
//       params: {
//         GroupType: 'NotArchived',
//         Take: 3,
//         HousingStockId: ids[0] ?? null,
//         DeviceId: ids[1] ?? null,
//       },
//     });
//     return {
//       events: {
//         items: res.items.map((item) => ({
//           ...item,
//           timeline: createTimeline(item),
//           timer: createTimer(item),
//         })),
//         loading: false,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
