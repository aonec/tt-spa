import {
  EResourceType,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';

export type IndividualDeviceLastReadingBarProps = {
  model: string;
  serialNumber: string;
  title: string;
  resource: EResourceType | null;
  device: IndividualDeviceListItemResponse | null;
  lastReading: IndividualDeviceReadingsSlimResponse | null;
  openReadingsHistoryModal: (payload: number) => void;
};
