import { IndividualDeviceOnTaskResponse } from './../../../myApi';
import { IndividualDeviceResponse } from 'myApi';

export type IndividualDeviceInfoProps = {
  device: IndividualDeviceResponse | IndividualDeviceOnTaskResponse;
};
