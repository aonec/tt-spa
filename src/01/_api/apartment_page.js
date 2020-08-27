import axios from '01/axios';

const URL = 'HousingStocks';

const replaceURL = (url = '') => url.replace(/objects/, URL);

export async function getInfo(url = '') {
  try {
    const res = await axios.get(replaceURL(url));
    return {
      ...res,
      info: true,
      header: createTitleObject(res),
    };
  } catch (error) {
  }
}

const MeteringDevicesURL = 'MeteringDevices';

export async function getApartmentDevices(url = '') {
  try {
    const newURL = (`${MeteringDevicesURL}?ApartmentId=${url}`);
    const res = await axios.get(newURL);
    return res;
  } catch (error) {
  }
}

const TasksURL = 'Tasks';

// const replaceURLTasks = (url = "") => url.replace(/objects/, TasksURL)
export async function getTasks(url = '') {
  try {
    // const res = await axios.get(replaceURL2(url))
    const res = await axios.get(TasksURL);
    return {
      ...res,
    };
  } catch (error) {
  }
}

const URL2 = 'Apartments';
const replaceURL2 = (url = '') => url.replace(/objects/, URL2);

export async function getApartment(url = '') {
  try {
    // const res = await axios.get(replaceURL2(url))
    const res = await axios.get(`Apartments/${url}`);
    // return { ...res, info: true, header: createTitleObject(res) }
    return {
      ...res,
    };
  } catch (error) {
  }
}

// utils
function createTitleObject(data) {
  const {
    street,
    number,
    city,
  } = data;
  return [`${street}, ${number}`, city];
}
