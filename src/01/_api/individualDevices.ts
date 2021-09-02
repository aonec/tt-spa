import axios from '01/axios';
import { toArray } from '01/features/individualDevices/addIndividualDevice/components/CheckFormValuesModal';
import { MagnetSeal } from '01/_pages/IndividualDeviceEdit/hooks/useSwitchMagnetSeal';
import { resolve } from 'path';
import {
  CreateIndividualDeviceRequest,
  SwitchIndividualDeviceRequest,
  IndividualDeviceResponse,
  MeteringDeviceResponse,
  CheckIndividualDeviceRequest,
  EOrderByRule,
  IndividualDeviceListItemResponse,
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

export interface SwitchIndividualDeviceRequestPayload extends WithMagnetSeal {
  device: SwitchIndividualDeviceRequest;
}

export const switchIndividualDevice = async (
  requestPayload: SwitchIndividualDeviceRequestPayload
) => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices/switch',
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

export interface CheckIndividualDeviceRequestPayload extends WithMagnetSeal {
  device: CheckIndividualDeviceRequest;
}

export const checkIndividualDevice = async (
  requestPayload: CheckIndividualDeviceRequestPayload
): Promise<MeteringDeviceResponse> => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices/check',
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

export const getIndividualDevice = async (
  id: number
): Promise<IndividualDeviceResponse> => {
  try {
    const res: IndividualDeviceResponse = await axios.get(
      `IndividualDevices/${id}`
    );
    return res;
  } catch (e) {
    throw new Error(e as any);
  }
};

export interface GetIndividualDeviceRequestParams {
  ApartmentId?: number | null;
  HousingStockId?: number | null;
  Resource?: string | null;
  LastReadingsMonth?: string | null;
  TakeReadings?: number | null;
  ApartmentIds?: number[] | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export const getIndividualDevices = async (
  params: GetIndividualDeviceRequestParams
) => {

  const res: {
    items: IndividualDeviceListItemResponse[];
  } = await axios.get('IndividualDevices', { params });

  return res?.items;
};
