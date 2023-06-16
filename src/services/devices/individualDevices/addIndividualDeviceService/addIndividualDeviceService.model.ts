import { createDomain } from 'effector';
import { apartmentService } from 'services/apartments/apartmentService';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';

const domain = createDomain('addIndividualDeviceService');

const handleGoNextStage = domain.createEvent();
const handleGoPrevStage = domain.createEvent();

const createIndividualDeviceFx = domain.createEffect();

const $stageNumber = domain
  .createStore<number>(1)
  .on(handleGoNextStage, (prev) => prev + 1)
  .on(handleGoPrevStage, (prev) => prev - 1);

export const addIndividualDeviceService = {
  inputs: { handleGoNextStage, handleGoPrevStage },
  outputs: {
    $stageNumber,
    $apartment: apartmentService.outputs.$apartment,
    $individualDevicesNames:
      displayIndividualDeviceAndNamesService.outputs.$individualDevicesNames,
    $individualDeviceMountPlaces:
      individualDeviceMountPlacesService.outputs
        .$individualDeviceMountPlaces,
    $contractors: displayContractorsService.outputs.$contractors,
  },
  gates: {
    ApartmentGate: apartmentService.gates.ApartmentGate,
    ContractorsGate: displayContractorsService.gates.ContractorsGate,
    IndividualDevicecModelsGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDevicecModelsGate,
    AllIndividualDeviceMountPlacesGate:
      individualDeviceMountPlacesService.gates
        .AllIndividualDeviceMountPlacesGate,
  },
};
