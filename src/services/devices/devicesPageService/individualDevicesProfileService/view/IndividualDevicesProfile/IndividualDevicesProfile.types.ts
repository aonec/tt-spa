import { DevicesSearchType } from '../../individualDevicesProfileService.types';

export type IndividualDevicesProfileProps = {
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
};
