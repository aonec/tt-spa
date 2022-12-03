import { FC } from 'react';
import { IndividualDevicesViewBySerialNumberContainer } from './individualDevicesViewBySerialNumberService';
import { IndividualDevicesViewByAddressContainer } from './individualDevicesViewByAddressService';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';

export const IndividualDevicesViewComponents: {
  [key in DevicesSearchType]: FC;
} = {
  [DevicesSearchType.SearialNumber]: IndividualDevicesViewBySerialNumberContainer,
  [DevicesSearchType.Address]: IndividualDevicesViewByAddressContainer,
};
