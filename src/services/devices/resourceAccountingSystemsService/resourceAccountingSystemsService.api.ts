import { axios } from 'api/axios';
import { NodeOnHousingStockResponse } from 'api/myApi';

export const getNodes = (
  housingStockId: number,
): Promise<NodeOnHousingStockResponse[] | null> =>
  axios.get(`Buildings/${housingStockId}/Nodes`);
