import { IndividualDeviceOnTaskResponse } from 'api/types';

export type TaskIndividualDevicesListProps = {
  devices: IndividualDeviceOnTaskResponse[];
  apartmentId: number;
};
