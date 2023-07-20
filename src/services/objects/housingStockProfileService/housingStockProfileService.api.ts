import { axios } from 'api/axios';
import {
  EResourceDisconnectingStatus,
  HousingStockResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';

export const fetchHousingStock = (
  HousingStockId: number,
): Promise<HousingStockResponse> =>
  axios.get(`HousingStocks/${HousingStockId}`);

export const fetchResourceDisconnectionOnHousingStock = (
  HousingStockId: number,
): Promise<ResourceDisconnectingResponsePagedList> =>
  axios.get('ResourceDisconnecting', {
    params: { HousingStockId, Status: EResourceDisconnectingStatus.Active },
  });
