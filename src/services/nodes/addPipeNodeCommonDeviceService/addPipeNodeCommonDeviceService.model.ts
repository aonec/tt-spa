import { createDomain, forward } from 'effector';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'myApi';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';

const domain = createDomain('addPipeNodeCommonDeviceService');

const updateCommonDeviceRequestPayload = domain.createEvent<CreatePipeHousingMeteringDeviceInNodeRequest>();

const goNextStep = domain.createEvent();
const goPrevStep = domain.createEvent();

const openAddCommonDeviceModal = domain.createEvent();
const closeAddCommonDeviceModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openAddCommonDeviceModal, () => true)
  .reset(closeAddCommonDeviceModal);

const $currentFormStep = domain
  .createStore<number>(0)
  .on(goNextStep, (prev) => (prev === EXTREAM_STEP_NUMBER ? prev : prev + 1))
  .on(goPrevStep, (prev) => (prev === 0 ? prev : prev - 1));

forward({
  from: updateCommonDeviceRequestPayload,
  to: goNextStep,
});

export const addPipeNodeCommonDeviceService = {
  inputs: {
    openAddCommonDeviceModal,
    closeAddCommonDeviceModal,
    updateCommonDeviceRequestPayload,
    goPrevStep,
  },
  outputs: {
    $isModalOpen,
    $currentFormStep,
  },
};
