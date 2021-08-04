import axios from '01/axios';
import {
  CreateIndividualDeviceRequest,
  MeteringDeviceResponseSuccessApiResponse,
} from '../../myApi';

export interface CloseIndividualDeviceRequestBody {
  deviceId: number;
  documentsIds: number[];
  closingDate: string;
}

export const closeIndividualDevice = (
  requestBody: CloseIndividualDeviceRequestBody
) => axios.post('IndividualDevices/close', requestBody);

export const createIndividualDevice = (
  payload: CreateIndividualDeviceRequest
): Promise<MeteringDeviceResponseSuccessApiResponse> =>
  axios.post('IndividualDevices', payload);
