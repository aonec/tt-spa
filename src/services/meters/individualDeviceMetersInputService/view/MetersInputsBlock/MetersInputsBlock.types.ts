import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceReadingsResponse,
} from 'api/types';
import { UploadReading } from '../../individualDeviceMetersInputService.types';

export type MetersInputsBlockProps = {
  resource?: EResourceType;
  status?: MetersInputBlockStatus;
  rateType: EIndividualDeviceRateType;
  reading?: IndividualDeviceReadingsResponse;
  sliderIndex: number;
  isPrevious?: boolean;
  isDisabled?: boolean;
  inputIndex: number;
  handleUploadReading: UploadReading;
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
