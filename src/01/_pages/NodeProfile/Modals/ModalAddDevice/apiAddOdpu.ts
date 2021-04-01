import axios from '../../../../axios';
import {
  CalculatorListResponsePagedList,
  CalculatorResponse,
} from '../../../../../myApi';

export async function getObjectCalculators(id: number) {
  try {
    const res: CalculatorListResponsePagedList = await axios.get(
      `Calculators?Filter.HousingStockId=${id}`
    );
    return res.items;
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
    const res = await axios.get<CalculatorResponse>(`Calculators/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройства',
    };
  }
}

export async function addOdpu(form: any) {
  try {
    const res = await axios.post('HousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}
