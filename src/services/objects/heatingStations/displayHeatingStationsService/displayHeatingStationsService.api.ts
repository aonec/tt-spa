import { axios } from '01/axios';
import { HeatingStationResponse, HeatingStationResponsePagedList } from 'myApi';

export const getHeatingStations = (): Promise<HeatingStationResponsePagedList | null> => {
  return axios.get('HeatingStation');
};

export const getHeatingStation = (
  id: string
): Promise<HeatingStationResponse | null> => {
  return axios.get(`HeatingStation/${id}`);
};
