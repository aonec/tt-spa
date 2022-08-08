import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.model';
import { createDomain } from 'effector';
import { managementFirmConsumptionRatesService } from '../managementFirmConsumptionRatesService';
import { openConfirmReadingModal } from '01/features/readings/readingsInput/confirmInputReadingModal/models';

const domain = createDomain('individualDeviceMetersInputService');

const $devices =
  apartmentIndividualDevicesMetersService.outputs.$individualDevicesList;

export const individualDeviceMetersInputService = {
  inputs: {
    openConfirmReadingModal,
  },
  outputs: {
    $devices,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
};
