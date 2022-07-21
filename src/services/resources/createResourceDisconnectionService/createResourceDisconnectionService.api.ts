import { axios } from '01/axios';
import {
  HeatingStationResponsePagedList,
  ResourceDisconnectingCreateRequest,
} from 'myApi';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest
): Promise<void> => axios.post('ResourceDisconnecting', payload);

export const fetchHeatingStations = (
  city: string
): Promise<HeatingStationResponsePagedList> => axios.get('HeatingStation');
