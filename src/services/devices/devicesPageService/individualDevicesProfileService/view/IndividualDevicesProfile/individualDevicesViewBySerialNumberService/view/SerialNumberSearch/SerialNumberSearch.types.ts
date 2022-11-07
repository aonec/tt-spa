import { IndividualDeviceSearchbySerialNumberPayload } from '../../individualDevicesViesBySerialNumberService.types';

export type IndividualDevicesViewBySerialNumberSearchProps = {
  filter: IndividualDeviceSearchbySerialNumberPayload;
  setFilter: (payload: IndividualDeviceSearchbySerialNumberPayload) => void;
};
