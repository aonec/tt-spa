import {
  IndividualDeviceResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'api/types';

export type IndividualDeviceInfoShortProps = {
  device: IndividualDeviceResponseFromDevicePage | IndividualDeviceResponse;
  onClick?: () => void;
};
