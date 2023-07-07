import { axios } from '01/axios';
import { NodeOnHousingStockResponse } from 'myApi';

export const getNodes = (
  housingStockId: number,
  //Дождаться правок
): Promise<NodeOnHousingStockResponse[] | null> =>
  axios.get(`Buildings/${housingStockId}/Nodes`);
