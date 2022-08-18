import { axios } from '01/axios';
import {
  EResourceDisconnectingStatus,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';

export const fetchResourceDisconnectionOnHousingStock = (
  HousingStockId: number
): Promise<ResourceDisconnectingResponsePagedList> =>
  axios.get('ResourceDisconnecting', {
    params: { HousingStockId, Status: EResourceDisconnectingStatus.Active },
  });
