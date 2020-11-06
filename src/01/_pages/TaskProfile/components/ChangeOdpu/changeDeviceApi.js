import axios from "../../../../axios";

export async function getCalculator(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
    console.log(res)
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getClosedDevices(type = '', serialNumber = '') {
  const typeRes = type === 'Calculator' ? 'Calculator' : 'Housing';
  try {
    const res = await axios.get(`MeteringDevices/search?DeviceType=${typeRes}&Status=Closed&Question=${serialNumber}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}