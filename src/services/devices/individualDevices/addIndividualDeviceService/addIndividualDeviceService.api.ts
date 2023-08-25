import { axios } from 'api/axios';
import {
  CreateIndividualDeviceRequest,
  MeteringDeviceResponse,
} from 'api/types';

export const createIndividualDevice = async (
  payload: CreateIndividualDeviceRequest,
): Promise<MeteringDeviceResponse> => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices',
    payload,
  );

  return res;
};
