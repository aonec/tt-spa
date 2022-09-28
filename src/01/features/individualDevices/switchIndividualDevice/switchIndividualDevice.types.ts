import { CheckIndividualDeviceRequest } from 'myApi';

export type CheckIndividualDevicePayload = CheckIndividualDeviceRequest & {
  deviceId: number;
};
