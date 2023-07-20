import { IndividualDeviceOnTaskResponse } from 'api/myApi';

export type TaskIndividualDevicesListProps = {
  devices: IndividualDeviceOnTaskResponse[];
  apartmentId: number;
};
