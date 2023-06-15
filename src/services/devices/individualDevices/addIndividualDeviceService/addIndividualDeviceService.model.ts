import { createDomain } from 'effector';
import { apartmentService } from 'services/apartments/apartmentService';

const domain = createDomain('addIndividualDeviceService');

const handleGoSecondStage = domain.createEvent();
const handleGoFirstStage = domain.createEvent();

const createIndividualDeviceFx = domain.createEffect();

const $stageNumber = domain
  .createStore<number>(1)
  .on(handleGoSecondStage, () => 2)
  .on(handleGoFirstStage, () => 1);

export const addIndividualDeviceService = {
  inputs: { handleGoSecondStage, handleGoFirstStage },
  outputs: { $stageNumber, $apartment: apartmentService.outputs.$apartment },
  gates: { ApartmentGate: apartmentService.gates.ApartmentGate },
};
