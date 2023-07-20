import {
  IndividualDeviceListItemResponse,
  IndividualDeviceOnTaskResponse,
  IndividualDeviceResponse,
} from 'api/myApi';

export type IndividualDeviceInfoExtendedProps = {
  device:
    | IndividualDeviceListItemResponse
    | IndividualDeviceOnTaskResponse
    | IndividualDeviceResponse;
  onClick?: () => void;
};
