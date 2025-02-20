import { createEvent, createStore, sample } from 'effector';
import { closeTasksMutation } from './closeTasksService.api';
import { TaskCloseStatusModel } from 'api/types';

const openModal = createEvent();
const closeModal = createEvent();

const $isCloseTasksModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const $closeResults = createStore<TaskCloseStatusModel[] | null>(null)
  .on(closeTasksMutation.finished.success, (_, { result }) => result)
  .reset(closeModal);

sample({
  clock: closeTasksMutation.finished.success,
  filter: ({ result }) => {
    return result.every((elem) => elem.isSuccess);
  },
  target: [closeModal, closeTasksMutation.reset],
});

export const closeTasksService = {
  inputs: { openModal, closeModal },
  outputs: { $isCloseTasksModalOpen, $closeResults },
};
