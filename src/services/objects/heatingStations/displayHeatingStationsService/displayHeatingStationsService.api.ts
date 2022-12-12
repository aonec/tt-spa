import { axios } from '01/axios';
import { HeatingStationResponsePagedList } from 'myApi';

export const getHeatingStations = (): Promise<HeatingStationResponsePagedList | null> => {
  return axios.get('HeatingStation');
};
