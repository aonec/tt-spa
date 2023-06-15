import { createDomain } from 'effector';
import { apartmentService } from 'services/apartments/apartmentService';

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
  outputs: { $stageNumber, $apartment: apartmentService.outputs.$apartment },
  gates: { ApartmentGate: apartmentService.gates.ApartmentGate },
};
