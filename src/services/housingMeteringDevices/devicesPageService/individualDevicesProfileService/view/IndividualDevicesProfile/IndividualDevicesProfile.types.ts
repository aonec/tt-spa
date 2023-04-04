import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';

export type IndividualDevicesProfileProps = {
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
};
