import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceReadingsResponse,
} from 'myApi';

export type MetersInputsBlockProps = {
  resource?: EResourceType;
  status?: 'done' | 'error' | 'loading';
  rateType: EIndividualDeviceRateType;
  reading?: IndividualDeviceReadingsResponse;
  sliderIndex?: number;
  isPrevious?: boolean;
  isDisabled?: boolean;
  inputIndex: number;
};
