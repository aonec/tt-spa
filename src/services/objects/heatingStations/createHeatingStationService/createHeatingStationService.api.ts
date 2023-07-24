import { axios } from 'api/axios';
import { AddHeatingStationRequest, HeatingStationResponse } from 'api/types';

export const postHeatingStation = (
  requestPayload: AddHeatingStationRequest,
): Promise<HeatingStationResponse | null> => {
  return axios.post('HeatingStation', requestPayload);
};
