import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { UploadReading } from '../../individualDeviceMetersInputService.types';

export type IndividualDeviceMetersInputLineProps = {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  openReadingsHistoryModal: () => void;
  currentReading: IndividualDeviceReadingsResponse | undefined;
  previousReading: IndividualDeviceReadingsResponse | undefined;
  inputIndex: number;
  handleUploadReading: UploadReading;
};
