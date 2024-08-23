import { createEvent, createStore, sample } from 'effector';
import {
  addNodeToIntegrationMutation,
  getNodeQuery,
  searchNodesQuery,
} from './addNodeToIntegrationService.api';
import { mvituIntegrationSectionService } from '../mvituIntegrationSection/mvituIntegrationSectionService.models';
import { message } from 'antd';

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

sample({
  clock: addNodeToIntegrationMutation.finished.success,
  target: searchNodesQuery.reset,
});

addNodeToIntegrationMutation.finished.failure.watch((e) =>
  message.error(e.error.response.data.error.Text),
);

export const addNodeToIntegrationService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
};
