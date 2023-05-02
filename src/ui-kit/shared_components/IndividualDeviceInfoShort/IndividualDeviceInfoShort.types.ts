import {
  IndividualDeviceResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'myApi';

export type IndividualDeviceInfoShortProps = {
  device: IndividualDeviceResponseFromDevicePage | IndividualDeviceResponse;
  onClick?: () => void;
};
