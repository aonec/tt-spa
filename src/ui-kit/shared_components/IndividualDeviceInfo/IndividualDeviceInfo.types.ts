import {
  IndividualDeviceResponse,
  IndividualDeviceOnTaskResponse,
} from 'myApi';

export type IndividualDeviceInfoProps = {
  device: IndividualDeviceResponse | IndividualDeviceOnTaskResponse;
  showCheckingDates?: boolean;
};
