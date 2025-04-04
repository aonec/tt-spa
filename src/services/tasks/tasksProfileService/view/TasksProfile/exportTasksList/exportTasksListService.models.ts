import { createEvent, createStore, sample } from 'effector';
import { exportTasksService } from 'services/tasks/exportTasksListService/exportTasksListService.model';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: exportTasksService.inputs.exportTasksList,
  target: closeModal,
});

export const exportTasksListService = {
  inputs: { openModal, closeModal },
  outputs: { $isOpen },
};
