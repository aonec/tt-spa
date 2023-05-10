import { createDomain } from 'effector';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';

const domain = createDomain('splitPersonalNumberService');

const setStageNumber = domain.createEvent<number>();

const $stageNumber = domain
  .createStore<number>(1)
  .on(setStageNumber, (_, stageNumber) => stageNumber);





export const splitPersonalNumberService = {
  inputs: { setStageNumber },
  outputs: {
    $stageNumber,
    $apartment: apartmentProfileService.outputs.$apartment,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
