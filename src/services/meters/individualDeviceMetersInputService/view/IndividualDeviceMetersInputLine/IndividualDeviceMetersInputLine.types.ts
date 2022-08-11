import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { UploadReading } from '../../individualDeviceMetersInputService.types';
import { MetersInputBlockStatus } from '../MetersInputsBlock/MetersInputsBlock.types';

export type IndividualDeviceMetersInputLineProps = {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  openReadingsHistoryModal: () => void;
  currentReading: IndividualDeviceReadingsResponse | undefined;
  previousReading: IndividualDeviceReadingsResponse | undefined;
  inputIndex: number;
  handleUploadReading: UploadReading;
  uploadingMetersStatuses: {
    [sliderIndex: number]: MetersInputBlockStatus;
  };
  previousReadingByCurrentSliderIndex:
    | IndividualDeviceReadingsResponse
    | null
    | undefined;
};
