import axios from '01/axios';
import { MagnetSeal } from '01/_pages/IndividualDeviceEdit/hooks/useSwitchMagnetSeal';
import {
  CreateIndividualDeviceRequest,
  MeteringDeviceResponse,
} from '../../myApi';

export interface CloseIndividualDeviceRequestBody {
  deviceId: number;
  documentsIds: number[];
  closingDate: string;
}

export const closeIndividualDevice = (
  requestBody: CloseIndividualDeviceRequestBody
) => axios.post('IndividualDevices/close', requestBody);

export interface CreateCreateIndividualDeviceWithMagnetSealRequest {
  device: CreateIndividualDeviceRequest;
  magnetSeal: MagnetSeal;
}

export const createIndividualDevice = async (
  payload: CreateCreateIndividualDeviceWithMagnetSealRequest
): Promise<MeteringDeviceResponse> => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices',
    payload.device
  );

  if (payload.magnetSeal.isInstalled) {
    await axios.post(
      `IndividualDevices/${res.id}/SetMagneticSeal`,
      payload.magnetSeal
    );
  }

  return res;
};
