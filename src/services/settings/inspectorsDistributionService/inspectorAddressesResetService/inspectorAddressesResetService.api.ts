import { axios } from 'api/axios';
import { InspectorResponse } from 'myApi';

export const resetInspectorHousingStocksAddresses = (
  inspectorId: number,
): Promise<InspectorResponse | null> =>
  axios.delete(`Inspectors/${inspectorId}/housingStocks`);
