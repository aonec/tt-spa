import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { UploadReading } from '../../individualDeviceMetersInputService.types';

export type MetersInputsBlockProps = {
  resource?: EResourceType;
  status?: 'done' | 'error' | 'loading';
  rateType: EIndividualDeviceRateType;
  reading?: IndividualDeviceReadingsResponse;
  sliderIndex?: number;
  isPrevious?: boolean;
  isDisabled?: boolean;
  inputIndex: number;
  handleUploadReading: UploadReading;
};

export type BufferedReadingValues = {
  value1: string;
  value2: string;
  value3: string;
};
