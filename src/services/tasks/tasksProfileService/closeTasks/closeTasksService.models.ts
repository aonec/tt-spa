import { createEvent, createStore, sample } from 'effector';
import { closeTasksMutation } from './closeTasksService.api';
import { TaskCloseStatusModel } from 'api/types';
import { message } from 'antd';
import { tasksProfileService } from '../tasksProfileService.model';

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

closeTasksMutation.finished.success.watch(({ result }) => {
  const successAmount = result.filter((elem) => elem.isSuccess).length;

  if (successAmount) message.info(`Закрыто ${successAmount} задач`);
});

sample({
  clock: closeTasksMutation.finished.success,
  fn: () => [],
  target: [
    tasksProfileService.inputs.setSelectedTasks,
    tasksProfileService.inputs.refetchTasks,
  ],
});

export const closeTasksService = {
  inputs: { openModal, closeModal },
  outputs: { $isCloseTasksModalOpen, $closeResults },
};
