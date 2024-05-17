import { createEvent, createStore } from 'effector';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

export const connectNotificationsService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: { $isOpen },
};
