import { axios } from '01/axios';
import {
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'myApi';

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};

export const getHeatingStations = (): Promise<
  HeatingStationResponsePagedList | null
> => {
  return axios.get('HeatingStation');
};
