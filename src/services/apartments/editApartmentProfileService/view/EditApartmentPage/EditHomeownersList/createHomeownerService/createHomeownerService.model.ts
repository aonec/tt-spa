import { createDomain } from 'effector';

const domain = createDomain('createHomeownerService');

const openCreateHomeownerModal = domain.createEvent();
const closeCreateHomeownerModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateHomeownerModal, () => true)
  .reset(closeCreateHomeownerModal);

export const createHomeownerService = {
  inputs: {
    openCreateHomeownerModal,
    closeCreateHomeownerModal,
  },
  outputs: {
    $isModalOpen,
  },
};
