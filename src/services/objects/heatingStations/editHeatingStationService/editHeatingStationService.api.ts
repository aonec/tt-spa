import { axios } from '01/axios';
import { HeatingStationResponse } from 'myApi';
import { requestParams } from './editHeatingStationService.types';

export const editHeatingStation = (
  params: requestParams
): Promise<HeatingStationResponse | null> => {
  return axios.put(`HeatingStation/${params.id}`, params.data);
};
