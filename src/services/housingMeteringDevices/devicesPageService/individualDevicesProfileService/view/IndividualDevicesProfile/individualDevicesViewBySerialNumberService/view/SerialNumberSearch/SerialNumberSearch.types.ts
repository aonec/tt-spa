import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';
import { IndividualDeviceSearchbySerialNumberPayload } from '../../individualDevicesViesBySerialNumberService.types';

export type IndividualDevicesViewBySerialNumberSearchProps = {
  filter: IndividualDeviceSearchbySerialNumberPayload;
  setFilter: (payload: IndividualDeviceSearchbySerialNumberPayload) => void;
  clearSearchPayload: () => void;
  mountPlaces: IndividualDeviceMountPlaceForFilterResponse[];
};
