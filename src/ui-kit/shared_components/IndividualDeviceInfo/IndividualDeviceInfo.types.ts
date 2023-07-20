import {
  IndividualDeviceResponse,
  IndividualDeviceOnTaskResponse,
} from 'api/myApi';

export type IndividualDeviceInfoProps = {
  device: IndividualDeviceResponse | IndividualDeviceOnTaskResponse;
  showCheckingDates?: boolean;
};
