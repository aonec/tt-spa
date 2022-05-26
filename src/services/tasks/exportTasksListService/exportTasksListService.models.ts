import { createDomain } from 'effector';

const exportTasksListServiceDomain = createDomain('exportTasksListService');

const $isModalOpen = exportTasksListServiceDomain.createStore(false);

const openModal = exportTasksListServiceDomain.createEvent();
const closeModal = exportTasksListServiceDomain.createEvent();

$isModalOpen.on(openModal, () => true).reset(closeModal);

export const exportTasksListService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $isModalOpen,
  },
};
