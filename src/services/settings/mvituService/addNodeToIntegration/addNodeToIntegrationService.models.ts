import { createEvent, createStore, sample } from 'effector';
import {
  addNodeToIntegrationMutation,
  getNodeQuery,
} from './addNodeToIntegrationService.api';
import { mvituIntegrationSectionService } from '../mvituIntegrationSection/mvituIntegrationSectionService.models';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const $isModalOpen = createStore(false)
  .on(handleOpenModal, () => true)
  .reset(handleCloseModal);

sample({
  clock: handleCloseModal,
  target: getNodeQuery.reset,
});

sample({
  clock: addNodeToIntegrationMutation.finished.success,
  target: [
    handleCloseModal,
    mvituIntegrationSectionService.inputs.refetchNodesQuery,
  ],
});

export const addNodeToIntegrationService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
};