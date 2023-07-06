import { axios } from '01/axios';
import { HousingStockResponse } from 'myApi';
import { PatchHousingStockInspectorInfoPayload } from './inspectorHousingStockService.types';

export const patchHousingStockInspectorInfo = async (
  payload: PatchHousingStockInspectorInfoPayload,
): Promise<HousingStockResponse | null> => {
  return axios.patch(
    `Buildings/${payload.housingStockId}/inspector`,
    payload.data,
  );
};
