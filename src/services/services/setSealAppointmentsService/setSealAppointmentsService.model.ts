import { createDomain } from 'effector';

const domain = createDomain('setSealAppointmentsService');

const closeModal = domain.createEvent();
const openModal = domain.createEvent();
const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

export const setSealAppointmentsService = {
  inputs: {
    closeModal,
    openModal,
  },
  outputs: {
    $isOpen,
  },
};
