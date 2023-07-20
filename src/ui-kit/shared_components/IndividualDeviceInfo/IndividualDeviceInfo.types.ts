import {
  IndividualDeviceResponse,
  IndividualDeviceOnTaskResponse,
} from 'api/types';

export type IndividualDeviceInfoProps = {
  device: IndividualDeviceResponse | IndividualDeviceOnTaskResponse;
  showCheckingDates?: boolean;
};
