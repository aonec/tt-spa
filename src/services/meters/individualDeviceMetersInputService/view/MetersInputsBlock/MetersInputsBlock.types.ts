import {
  EIndividualDeviceRateType,
  EResourceType,
  IndividualDeviceReadingsResponse,
} from 'myApi';

export type MetersInputsBlockProps = {
  resource?: EResourceType;
  disabled?: boolean;
  status?: 'done' | 'error' | 'loading';
  rateType: EIndividualDeviceRateType;
  reading?: IndividualDeviceReadingsResponse;
};
