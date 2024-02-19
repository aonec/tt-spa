import { axios } from 'api/axios';
import { HousingStockResponse } from 'api/types';
import { PatchHousingStockInspectorInfoPayload } from './inspectorHousingStockService.types';

export const patchHousingStockInspectorInfo = (
  payload: PatchHousingStockInspectorInfoPayload,
): Promise<HousingStockResponse | null> => {
  return axios.patch(
    `Buildings/${payload.housingStockId}/inspector`,
    payload.data,
  );
};
