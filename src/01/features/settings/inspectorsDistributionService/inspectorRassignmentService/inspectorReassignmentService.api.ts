import { axios } from '../../../../../api/axios';
import { PatchInspectorPayload } from './inspectorReassignmentService.types';

export const reassingHousingStockInspector = ({
  inspectorId,
  newInspectorId,
}: PatchInspectorPayload): Promise<void> =>
  axios.patch(`Inspectors/${inspectorId}/housingStocks`, { newInspectorId });
