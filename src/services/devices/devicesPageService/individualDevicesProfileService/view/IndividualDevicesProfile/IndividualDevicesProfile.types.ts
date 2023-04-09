import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';

export type IndividualDevicesProfileProps = {
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
};
