import { SwitchIndividualDeviceReadingsCreateRequest } from 'api/myApi';

export type EditReadingsHistoryPayload = {
  deviceId: number;
  newReadings: SwitchIndividualDeviceReadingsCreateRequest;
};
