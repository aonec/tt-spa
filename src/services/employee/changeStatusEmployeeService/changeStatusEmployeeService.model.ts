import { createDomain } from 'effector';

const domain = createDomain('changeStatusEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const changeStatusEmployeeService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
};
