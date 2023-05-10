import { createDomain } from 'effector';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { SplitPersonalNumberSubmitData } from './splitPersonalNumberService.types';

const domain = createDomain('splitPersonalNumberService');

const setStageNumber = domain.createEvent<number>();

const handleSubmitSplit = domain.createEvent<SplitPersonalNumberSubmitData>();

const $stageNumber = domain
  .createStore<number>(1)
  .on(setStageNumber, (_, stageNumber) => stageNumber);

const $splitPersonalNumberData = domain
  .createStore<SplitPersonalNumberSubmitData | null>(null)
  .on(handleSubmitSplit, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }));
// .reset(resetter);

export const splitPersonalNumberService = {
  inputs: { setStageNumber, handleSubmitSplit },
  outputs: {
    $stageNumber,
    $apartment: apartmentProfileService.outputs.$apartment,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
