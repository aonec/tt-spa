import { axios } from '../../../../../../api/axios';
import { HousingStockResponse } from '../../../../../../api/types';
import { PatchHousingStockInspectorInfoPayload } from './inspectorHousingStockService.types';

export const patchHousingStockInspectorInfo = async (
  payload: PatchHousingStockInspectorInfoPayload
): Promise<HousingStockResponse | null> => {
  return axios.patch(
    `HousingStocks/${payload.housingStockId}/inspector`,
    payload.data
  );
};
