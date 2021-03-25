import axios from '../../axios';

export async function getNode(id = '') {
  try {
    const res = await axios.get(`Nodes/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'node',
      message: 'Произошла ошибка запроса узла',
    };
  }
}

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
