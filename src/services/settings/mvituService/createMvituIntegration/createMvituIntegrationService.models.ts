import { createEvent, createStore, sample } from 'effector';
import { createOrUpdateIntegration } from './createMvituIntegrationService.api';

const openModal = createEvent();
const closeModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: createOrUpdateIntegration.finished.success,
  target: closeModal,
});

export const createMvituIntegrationService = {
  inputs: { openModal, closeModal },
  outputs: { $isModalOpen },
};
