import { axios } from '01/axios';
import { HousingStockResponse } from 'myApi';
import { PatchHousingStockInspectorInfoPayload } from './types';

export const patchHousingStockInspectorInfo = async (
  payload: PatchHousingStockInspectorInfoPayload
): Promise<HousingStockResponse | null> => {
  return axios.patch(
    `HousingStocks/${payload.housingStockId}/inspector`,
    payload.data
  );
};
