import { IndividualDeviceOnTaskResponse } from 'myApi';

export type TaskIndividualDevicesListProps = {
  devices: IndividualDeviceOnTaskResponse[];
  apartmentId: number;
  housingStockId: number;
};
