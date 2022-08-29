import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.model';

const $devices =
  apartmentIndividualDevicesMetersService.outputs.$individualDevicesList;

export const individualDeviceMetersInputService = {
  outputs: {
    $devices,
  },
};
