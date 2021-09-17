import axios from '../../../../../axios';

export async function getObjectCalculators(id = '') {
  try {
    const res = await axios.get(`Calculators?Filter.HousingStockId=${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'devices',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

export async function getCalculator(id = '') {
  try {
    const res = await axios.get(`Calculators/${id}`);
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function addOdpu(form) {
  try {
    const res = await axios.post('PipeHousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}
