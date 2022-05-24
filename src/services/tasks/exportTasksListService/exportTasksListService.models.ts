import { createDomain } from 'effector';

const exportTasksListServiceDomain = createDomain('exportTasksListService');

const $isModalOpen = exportTasksListServiceDomain.createStore(false);

export const exportTasksListService = {
  inputs: {},
  outputs: {
    $isModalOpen,
  },
};
