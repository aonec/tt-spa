import axios from "../../axios";

export async function getCalculators(id = '') {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'calculators',
      message: 'Произошла ошибка запроса вычислителей',
    };
  }
}

export async function getDeviceTasks(id = '') {
  try {
    const res = await axios.get(`Tasks?DeviceId=${id}`);
    // console.log("res", res)
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка запроса задач по устройству',
    };
  }
}

// /Calculators?Filter.HousingStockId=45