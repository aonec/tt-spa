import {
  IndividualDeviceListItemResponse,
  IndividualDeviceOnTaskResponse,
} from 'myApi';

export type IndividualDeviceInfoExtendedProps = {
  device: IndividualDeviceListItemResponse | IndividualDeviceOnTaskResponse;
};
