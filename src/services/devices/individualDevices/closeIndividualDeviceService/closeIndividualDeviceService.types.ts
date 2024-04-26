import { CloseIndividualDeviceRequest } from 'api/types';

export type CloseIndividualDevicePayload = {
  deviceId: number;
} & CloseIndividualDeviceRequest;
