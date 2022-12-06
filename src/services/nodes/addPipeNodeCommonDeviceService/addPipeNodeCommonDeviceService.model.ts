import { createDomain, forward, sample } from 'effector';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';
import { CreateCommonDevicePartitial } from './addPipeNodeCommonDeviceService.types';

const domain = createDomain('addPipeNodeCommonDeviceService');

const updateCommonDeviceRequestPayload = domain.createEvent<CreateCommonDevicePartitial>();

const goNextStep = domain.createEvent();
const goPrevStep = domain.createEvent();

const openAddCommonDeviceModal = domain.createEvent();
const closeAddCommonDeviceModal = domain.createEvent();

const openAddPipeModal = domain.createEvent();
const closeAddPipeModal = domain.createEvent();

const handleFormComplete = domain.createEvent();

const handleMeteringDeviceCreated = domain.createEvent<CreateCommonDevicePartitial>();

const $requestPayload = domain
  .createStore<CreateCommonDevicePartitial>({})
  .on(updateCommonDeviceRequestPayload, (prev, payload) => ({
    ...prev,
    ...payload,
  }))
  .reset(closeAddCommonDeviceModal);

const $isModalOpen = domain
  .createStore(false)
  .on(openAddCommonDeviceModal, () => true)
  .reset(closeAddCommonDeviceModal);

const $isAddPipeModalOpen = domain
  .createStore(false)
  .on(openAddPipeModal, () => true)
  .on(closeAddPipeModal, () => false);

const $currentFormStep = domain
  .createStore<number>(0)
  .on(goNextStep, (prev) => (prev === EXTREAM_STEP_NUMBER ? prev : prev + 1))
  .on(goPrevStep, (prev) => (prev === 0 ? prev : prev - 1))
  .reset(closeAddCommonDeviceModal);

forward({
  from: updateCommonDeviceRequestPayload,
  to: goNextStep,
});

sample({
  source: $requestPayload,
  clock: handleFormComplete,
  target: handleMeteringDeviceCreated,
});

export const addPipeNodeCommonDeviceService = {
  inputs: {
    openAddCommonDeviceModal,
    closeAddCommonDeviceModal,
    updateCommonDeviceRequestPayload,
    goPrevStep,
    openAddPipeModal,
    closeAddPipeModal,
    handleFormComplete,
    handleMeteringDeviceCreated,
  },
  outputs: {
    $isModalOpen,
    $currentFormStep,
    $requestPayload,
    $isAddPipeModalOpen,
  },
};
