import { IndividualDeviceResponseFromDevicePage } from 'myApi';

export type IndividualDevicesListProps = {
  isLoading: boolean;
  individualDevicesList: IndividualDeviceResponseFromDevicePage[] | null;
  apartmentId?: number;
};
