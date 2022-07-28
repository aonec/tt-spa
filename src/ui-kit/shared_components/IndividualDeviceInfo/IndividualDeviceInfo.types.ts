import { IndividualDeviceOnTaskResponse } from '../../../api/types';
import { IndividualDeviceResponse } from '../../../api/types';

export type IndividualDeviceInfoProps = {
  device: IndividualDeviceResponse | IndividualDeviceOnTaskResponse;
};
