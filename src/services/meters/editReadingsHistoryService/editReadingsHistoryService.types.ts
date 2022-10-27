import { SwitchIndividualDeviceReadingsCreateRequest } from 'myApi';

export type EditReadingsHistoryPayload = {
  deviceId: number;
  newReadings: SwitchIndividualDeviceReadingsCreateRequest;
};
