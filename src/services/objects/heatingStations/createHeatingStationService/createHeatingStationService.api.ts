import { axios } from '01/axios';
import { AddHeatingStationRequest, HeatingStationResponse } from 'myApi';

export const postHeatingStation = (
  requestPayload: AddHeatingStationRequest,
): Promise<HeatingStationResponse | null> => {
  return axios.post('HeatingStation', requestPayload);
};
