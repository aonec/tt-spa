import { axios } from '01/axios';
import { CreateIndividualDeviceRequest, MeteringDeviceResponse } from 'myApi';

export const createIndividualDevice = async (
  payload: CreateIndividualDeviceRequest,
): Promise<MeteringDeviceResponse> => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices',
    payload,
  );

  return res;
};
