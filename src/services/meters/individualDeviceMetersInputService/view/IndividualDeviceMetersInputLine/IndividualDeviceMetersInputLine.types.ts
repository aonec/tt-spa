import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from 'myApi';

export type IndividualDeviceMetersInputLineProps = {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  openReadingsHistoryModal: () => void;
  currentReading: IndividualDeviceReadingsResponse | undefined;
  previousReading: IndividualDeviceReadingsResponse | undefined;
};
