import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.model';
import { createDomain } from 'effector';

const domain = createDomain('individualDeviceMetersInputService');

const $devices =
  apartmentIndividualDevicesMetersService.outputs.$individualDevicesList;

export const individualDeviceMetersInputService = {
  inputs: {},
  outputs: {
    $devices,
  },
};
