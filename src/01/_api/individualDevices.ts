import axios from '01/axios';
import { MagnetSeal } from '01/_pages/IndividualDeviceEdit/hooks/useSwitchMagnetSeal';
import {
  CreateIndividualDeviceRequest,
  SwitchIndividualDeviceRequest,
  IndividualDeviceResponse,
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

interface WithMagnetSeal {
  magnetSeal: MagnetSeal;
}

export interface CreateCreateIndividualDeviceWithMagnetSealRequest
  extends WithMagnetSeal {
  device: CreateIndividualDeviceRequest;
}

export interface SwitchIndividualDeviceRequestPayload extends WithMagnetSeal {
  device: SwitchIndividualDeviceRequest;
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

export const switchIndividualDevice = async (
  requestPayload: SwitchIndividualDeviceRequestPayload
) => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevice/switch',
    requestPayload.device
  );

  if (requestPayload.magnetSeal.isInstalled) {
    await axios.post(
      `IndividualDevices/${res.id}/SetMagneticSeal`,
      requestPayload.magnetSeal
    );
  }

  return res;
};

export const getIndividualDevice = (
  id: number
): Promise<IndividualDeviceResponse> => axios.get(`IndividualDevices/${id}`);
