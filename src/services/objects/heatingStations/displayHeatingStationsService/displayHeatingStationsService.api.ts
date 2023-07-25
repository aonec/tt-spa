import { axios } from 'api/axios';
import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
} from 'api/types';

export const getHeatingStations =
  (): Promise<HeatingStationResponsePagedList | null> => {
    return axios.get('HeatingStation');
  };

export const getHeatingStation = (
  id: string,
): Promise<HeatingStationResponse | null> => {
  return axios.get(`HeatingStation/${id}`);
};
