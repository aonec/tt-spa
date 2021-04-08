import axios from '../../axios';
import {
  CalculatorListResponsePagedList,
  CreateNodeRequest,
  HousingStockResponse,
} from '../../../myApi';

export async function getHousingStock(housingStockId: number) {
  try {
    const res: HousingStockResponse = await axios.get(
      `HousingStocks/${housingStockId}`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'housingStock',
      message: 'Произошла ошибка запроса дома',
    };
  }
}

export async function getCalculators(id: number) {
  try {
    const res: CalculatorListResponsePagedList = await axios.get(
      `Calculators?Filter.HousingStockId=${id}`
    );
    const { items } = res;
    return items;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'calculators',
      message: 'Произошла ошибка запроса вычислителей',
    };
  }
}

export async function addNodeFinal(form: CreateNodeRequest) {
  try {
    const res = await axios.post('Nodes', form);
    alert('Узел успешно создан');
    return res;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка создания Узла!');
    throw {
      resource: 'node',
      message: 'Произошла ошибка создания Узла!',
    };
  }
}
