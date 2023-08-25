import { FC } from 'react';
import { IndividualDevicesViewBySerialNumberContainer } from './individualDevicesViewBySerialNumberService';
import { IndividualDevicesViewByAddressContainer } from './individualDevicesViewByAddressService';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

export const IndividualDevicesViewComponents: {
  [key in DevicesSearchType]: FC<HeaderInject>;
} = {
  [DevicesSearchType.SearialNumber]:
    IndividualDevicesViewBySerialNumberContainer,
  [DevicesSearchType.Address]: IndividualDevicesViewByAddressContainer,
};
