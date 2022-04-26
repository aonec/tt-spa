import { axios } from '01/axios';
import { InspectorResponse } from 'myApi';

export const resetInspectorHousingStocksAddresses = (
  inspectorId: number
): Promise<InspectorResponse | null> =>
  axios.delete(`/api/Inspectors/${inspectorId}/housingStocks`);
