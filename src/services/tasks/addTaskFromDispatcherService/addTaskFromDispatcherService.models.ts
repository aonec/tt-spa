import { createDomain } from 'effector';

const domain = createDomain('addTaskFromDispatcherService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const addTaskFromDispatcherService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
};
