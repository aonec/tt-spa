import { createEvent, createStore } from 'effector';
import { forward, guard, sample } from 'effector';
import { EXTREAM_STEP_NUMBER } from './addPipeNodeCommonDeviceService.constants';
import { CreateCommonDevicePartitial } from './addPipeNodeCommonDeviceService.types';

const updateCommonDeviceRequestPayload =
  createEvent<CreateCommonDevicePartitial>();

const goNextStep = createEvent();
const goPrevStep = createEvent();

const openAddCommonDeviceModal = createEvent();
const closeAddCommonDeviceModal = createEvent();

const handleFormComplete = createEvent();

const handleMeteringDeviceCreated = createEvent<CreateCommonDevicePartitial>();

const $requestPayload = createStore<CreateCommonDevicePartitial>({})
  .on(updateCommonDeviceRequestPayload, (prev, payload) => ({
    ...prev,
    ...payload,
  }))
  .reset(closeAddCommonDeviceModal);

const $isModalOpen = createStore(false)
  .on(openAddCommonDeviceModal, () => true)
  .reset(closeAddCommonDeviceModal);

const $currentFormStep = createStore<number>(0)
  .on(goNextStep, (prev) => prev + 1)
  .on(goPrevStep, (prev) => prev - 1)
  .reset(closeAddCommonDeviceModal);

guard({
  source: $currentFormStep,
  clock: updateCommonDeviceRequestPayload,
  filter: (stepNumber) => stepNumber < EXTREAM_STEP_NUMBER,
  target: goNextStep,
});

sample({
  source: $requestPayload,
  clock: handleFormComplete,
  target: handleMeteringDeviceCreated,
});

forward({
  from: handleMeteringDeviceCreated,
  to: closeAddCommonDeviceModal,
});

export const addPipeNodeCommonDeviceService = {
  inputs: {
    openAddCommonDeviceModal,
    closeAddCommonDeviceModal,
    updateCommonDeviceRequestPayload,
    goPrevStep,
    handleFormComplete,
    handleMeteringDeviceCreated,
  },
  outputs: {
    $isModalOpen,
    $currentFormStep,
    $requestPayload,
  },
};
