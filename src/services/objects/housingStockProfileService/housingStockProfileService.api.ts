import { axios } from 'api/axios';
import {
  EResourceDisconnectingStatus,
  HousingStockResponse,
  ResourceDisconnectingResponsePagedList,
} from 'api/types';

export const fetchHousingStock = (
  HousingStockId: number,
): Promise<HousingStockResponse> =>
  axios.get(`HousingStocks/${HousingStockId}`);

export const fetchResourceDisconnectionOnHousingStock = (
  BuildingId: number,
): Promise<ResourceDisconnectingResponsePagedList> =>
  axios.get('ResourceDisconnecting', {
    params: { BuildingId, Status: EResourceDisconnectingStatus.Active },
  });
