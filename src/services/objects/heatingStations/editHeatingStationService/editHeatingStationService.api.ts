import { axios } from 'api/axios';
import { HeatingStationResponse } from 'api/myApi';
import { requestParams } from './editHeatingStationService.types';

export const editHeatingStation = (
  params: requestParams,
): Promise<HeatingStationResponse | null> => {
  return axios.put(`HeatingStation/${params.id}`, params.data);
};
