import { createEvent, createStore } from 'effector';

const openModal = createEvent();
const closeModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

export const createMvituIntegrationService = {
  inputs: { openModal, closeModal },
  outputs: { $isModalOpen },
};
