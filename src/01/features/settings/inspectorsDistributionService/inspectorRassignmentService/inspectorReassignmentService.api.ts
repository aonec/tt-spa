import { axios } from '01/axios';
import { PatchInspectorPayload } from './types';

export const reassingHousingStockInspector = ({
  inspectorId,
  newInspectorId,
}: PatchInspectorPayload): Promise<void> =>
  axios.patch(`Inspectors/${inspectorId}/housingStocks`, { newInspectorId });
