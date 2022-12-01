import { axios } from '01/axios';
import {
  AddHeatingStationRequest,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
} from 'myApi';

export const getHeatingStations = (): Promise<HeatingStationResponsePagedList | null> => {
  return axios.get('HeatingStation');
};

export const postHeatingStation = (
  requestPayload: AddHeatingStationRequest
): Promise<HeatingStationResponse | null> => {
  return axios.post('HeatingStation', requestPayload);
};
