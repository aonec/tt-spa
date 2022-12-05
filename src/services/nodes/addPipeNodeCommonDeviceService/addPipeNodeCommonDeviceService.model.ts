import { createDomain } from 'effector';

const domain = createDomain('addPipeNodeCommonDeviceService');

const openAddCommonDeviceModal = domain.createEvent();
const closeAddCommonDeviceModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openAddCommonDeviceModal, () => true)
  .reset(closeAddCommonDeviceModal);

export const addPipeNodeCommonDeviceService = {
  inputs: {
    openAddCommonDeviceModal,
    closeAddCommonDeviceModal,
  },
  outputs: {
    $isModalOpen,
  },
};
