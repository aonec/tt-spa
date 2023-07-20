import { SwitchIndividualDeviceReadingsCreateRequest } from 'api/types';

export type EditReadingsHistoryPayload = {
  deviceId: number;
  newReadings: SwitchIndividualDeviceReadingsCreateRequest;
};
