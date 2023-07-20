import { axios } from 'api/axios';
import {
  IndividualDeviceResponse,
  MeteringDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'myApi';

export const getIndividualDevice = (
  id: number,
): Promise<IndividualDeviceResponse> => {
  return axios.get(`IndividualDevices/${id}`);
};

export const putIndividualDevice = (request: {
  deviceId: number;
  payload: UpdateIndividualDeviceRequest;
}): Promise<MeteringDeviceResponse> => {
  return axios.put(`IndividualDevices/${request.deviceId}`, request.payload);
};
