import axios from '../../../../axios';

export async function getObjectCalculators(id: number) {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

export async function getCalculator(id: number) {
  try {
    const res = await axios.get(`Calculators/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}
