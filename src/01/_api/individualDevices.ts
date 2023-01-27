import axios from '01/axios';
import { CheckIndividualDevicePayload } from '01/features/individualDevices/switchIndividualDevice/switchIndividualDevice.types';
import { MagnetSeal } from '01/_pages/IndividualDeviceEdit/hooks/useSwitchMagnetSeal';
import _ from 'lodash';
import {
  CreateIndividualDeviceRequest,
  SwitchIndividualDeviceRequest,
  IndividualDeviceResponse,
  MeteringDeviceResponse,
  EOrderByRule,
  IndividualDeviceListItemResponsePagedList,
} from '../../myApi';

export interface CloseIndividualDeviceRequestBody {
  deviceId: number;
  documentsIds: number[];
  closingDate: string;
}

export const closeIndividualDevice = (
  requestBody: CloseIndividualDeviceRequestBody,
) => axios.post('IndividualDevices/close', requestBody);

interface WithMagnetSeal {
  magnetSeal: MagnetSeal;
}

export interface CreateCreateIndividualDeviceWithMagnetSealRequest
  extends WithMagnetSeal {
  device: CreateIndividualDeviceRequest;
}

export const createIndividualDevice = async (
  payload: CreateIndividualDeviceRequest,
): Promise<MeteringDeviceResponse> => {
  const res: MeteringDeviceResponse = await axios.post(
    'IndividualDevices',
    payload,
  );

  return res;
};

export interface SwitchIndividualDeviceRequestPayload extends WithMagnetSeal {
  device: SwitchIndividualDeviceRequest;
}

export const switchIndividualDevice = async (
  requestPayload: SwitchIndividualDeviceRequest,
): Promise<void> => {
  return await axios.post('IndividualDevices/switch', requestPayload);
};

export const checkIndividualDevice = (
  requestPayload: CheckIndividualDevicePayload,
): Promise<void> => {
  const {
    deviceId,
    currentCheckingDate,
    futureCheckingDate,
    readingsAfterCheck,
  } = requestPayload;

  return axios.post(`IndividualDevices/${deviceId}/check`, {
    currentCheckingDate,
    futureCheckingDate,
    readingsAfterCheck,
  });
};

export const getIndividualDevice = async (
  id: number,
): Promise<IndividualDeviceResponse> => {
  if (!id) throw 'no id';
  try {
    const res: IndividualDeviceResponse = await axios.get(
      `IndividualDevices/${id}`,
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
  params: GetIndividualDeviceRequestParams,
) => {
  const res: IndividualDeviceListItemResponsePagedList = await axios.get(
    'IndividualDevices',
    { params },
  );

  return { items: res?.items || [], total: res?.totalItems };
};

export const reopenIndividualDevice = async (deviceId: number) => {
  return await axios.post(`IndividualDevices/${deviceId}/reopen`);
};
