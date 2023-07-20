import { axios } from 'api/axios';
import { HousingStockResponse } from 'api/myApi';
import { PatchHousingStockInspectorInfoPayload } from './inspectorHousingStockService.types';

export const patchHousingStockInspectorInfo = async (
  payload: PatchHousingStockInspectorInfoPayload,
): Promise<HousingStockResponse | null> => {
  return axios.patch(
    `Buildings/${payload.housingStockId}/inspector`,
    payload.data,
  );
};
