import { axios } from '../../api/axios';
import { InspectorResponse } from '../../api/types';

export const resetInspectorHousingStocksAddresses = (
  inspectorId: number
): Promise<InspectorResponse | null> =>
  axios.delete(`Inspectors/${inspectorId}/housingStocks`);
