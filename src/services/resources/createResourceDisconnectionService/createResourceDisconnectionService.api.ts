import { axios } from '01/axios';
import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  ResourceDisconnectingCreateRequest,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest
): Promise<void> => axios.post('ResourceDisconnecting', payload);

