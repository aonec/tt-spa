import {
  IndividualDeviceListItemResponse,
  IndividualDeviceOnTaskResponse,
  IndividualDeviceResponse,
} from 'api/types';

export type IndividualDeviceInfoExtendedProps = {
  device:
    | IndividualDeviceListItemResponse
    | IndividualDeviceOnTaskResponse
    | IndividualDeviceResponse;
  onClick?: () => void;
};
