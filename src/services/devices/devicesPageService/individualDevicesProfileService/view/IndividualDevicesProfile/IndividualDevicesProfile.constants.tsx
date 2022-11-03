import { FC } from 'react';
import { DevicesSearchType } from '../../individualDevicesProfileService.types';
import { IndividualDevicesViewBySerialNumberContainer } from './individualDevicesViewBySerialNumberService';
import { IndividualDevicesViewByAddressContainer } from './individualDevicesViewByAddressService';

export const IndividualDevicesViewComponents: {
  [key in DevicesSearchType]: FC;
} = {
  [DevicesSearchType.SearialNumber]: IndividualDevicesViewBySerialNumberContainer,
  [DevicesSearchType.Address]: IndividualDevicesViewByAddressContainer,
};
