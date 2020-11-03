import axios from "../../../../axios";

async function getCalculator(id = '') {
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