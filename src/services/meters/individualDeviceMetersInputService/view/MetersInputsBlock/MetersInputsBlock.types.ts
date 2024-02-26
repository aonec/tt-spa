import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceReadingsResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import { UploadReading } from '../../individualDeviceMetersInputService.types';

export type MetersInputsBlockProps = {
  inputIndex: number;
  rateType: EIndividualDeviceRateType;
  sliderIndex: number;
  handleUploadReading?: UploadReading;
  resource?: EResourceType;
  status?: MetersInputBlockStatus;
  reading?:
    | IndividualDeviceReadingsResponse
    | IndividualDeviceReadingsSlimResponse
    | null;
  isPrevious?: boolean;
  isDisabled?: boolean;
  tooltip?: string;
  focusOnFirst?: boolean;
};

export type BufferedReadingValues = {
  value1: string;
  value2: string;
  value3: string;
};

export enum MetersInputBlockStatus {
  Loading = 'Loading',
  Done = 'Done',
  Failed = 'Failed',
}
