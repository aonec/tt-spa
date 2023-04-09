import { axios } from '01/axios';
import { NodeOnHousingStockResponse } from 'myApi';

export const getNodes = (
  housingStockId: number,
): Promise<NodeOnHousingStockResponse[] | null> =>
  axios.get(`HousingStocks/${housingStockId}/Nodes`);
