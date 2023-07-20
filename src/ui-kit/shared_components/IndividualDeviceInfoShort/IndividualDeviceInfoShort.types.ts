import {
  IndividualDeviceResponse,
  IndividualDeviceResponseFromDevicePage,
} from 'api/myApi';

export type IndividualDeviceInfoShortProps = {
  device: IndividualDeviceResponseFromDevicePage | IndividualDeviceResponse;
  onClick?: () => void;
};
