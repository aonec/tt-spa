import axios from "../../axios";

export async function getCalculator(id = '') {
  try {
 const res = await axios.get(`Calculators/${id}`);
    // const res = await axios.get(`Calculators/2210858`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function getCalculatorTasks(id = '') {
  try {
    const res = await axios.get(`Tasks?DeviceId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}