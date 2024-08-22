import { createEvent, createStore } from 'effector';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const $isModalOpen = createStore(false)
  .on(handleOpenModal, () => true)
  .reset(handleCloseModal);

export const addNodeToIntegrationService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
};
