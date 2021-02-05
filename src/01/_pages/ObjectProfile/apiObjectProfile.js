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

// /Calculators?Filter.HousingStockId=45