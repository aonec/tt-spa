import axios from "../../axios";

export async function getHousingStock(housingStockId = '') {
  try {
    const res = await axios.get(`HousingStocks/${housingStockId}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'housingStock',
      message: 'Произошла ошибка запроса дома',
    };
  }
}

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

export async function addNodeFinal(form = {}) {
  try {
    const res = await axios.post('Nodes', form);
    alert('Узел успешно создан')
    return res;
  } catch (error) {
    console.log(error);
    alert('Произошла ошибка создания Узла!')
    throw {
      resource: 'node',
      message: 'Произошла ошибка создания Узла!',
    };
  }
}

const template = {
  areaOfNonResidential: null,
  city: 'Нижнекамск',
  constructionDate: null,
  corpus: null,
  district: null,
  houseArea: null,
  houseCategory: null,
  id: 755,
  index: null,
  isThereElevator: null,
  number: '8',
  numberOfApartments: null,
  numberOfEntrances: null,
  numberOfFloors: null,
  region: null,
  street: 'Ямьле',
  totalArea: null,
  totalLivingArea: null,
};