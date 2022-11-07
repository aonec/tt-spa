import { FC } from 'react';
import { DevicesSearchType } from '../../individualDevicesProfileService.types';
import { IndividualDevicesViewByAddressContainer } from './individualDevicesViewByAddressService';

export const IndividualDevicesViewComponents: {
  [key in DevicesSearchType]: FC;
} = {
  [DevicesSearchType.SearialNumber]: () => null,
  [DevicesSearchType.Address]: IndividualDevicesViewByAddressContainer,
};
