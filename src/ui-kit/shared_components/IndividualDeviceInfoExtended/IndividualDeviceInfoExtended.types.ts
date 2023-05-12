import {
  IndividualDeviceListItemResponse,
  IndividualDeviceOnTaskResponse,
  IndividualDeviceResponse,
} from 'myApi';

export type IndividualDeviceInfoExtendedProps = {
  device:
    | IndividualDeviceListItemResponse
    | IndividualDeviceOnTaskResponse
    | IndividualDeviceResponse;
  onClick?: () => void;
};
