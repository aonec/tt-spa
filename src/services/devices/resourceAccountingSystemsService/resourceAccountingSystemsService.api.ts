import { axios } from 'api/axios';
import { NodeOnHousingStockResponse } from 'api/types';

export const getNodes = (
  housingStockId: number,
): Promise<NodeOnHousingStockResponse[] | null> =>
  axios.get(`Buildings/${housingStockId}/Nodes`);
