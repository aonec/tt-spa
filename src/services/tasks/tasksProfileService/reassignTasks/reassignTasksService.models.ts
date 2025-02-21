import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  organizationUsersQuery,
  reassignTasksMutation,
} from './reassignTasksService.api';
import { message } from 'antd';
import { tasksProfileService } from '../tasksProfileService.model';

const ReassignTasksGate = createGate();

const openModal = createEvent();
const closeModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({ clock: ReassignTasksGate.open, target: organizationUsersQuery.start });

sample({
  clock: reassignTasksMutation.finished.success,
  target: closeModal,
});

reassignTasksMutation.finished.success.watch(() => {
  message.success('Задачи переназначены');
});

reassignTasksMutation.finished.failure.watch(({ error }) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

sample({
  clock: reassignTasksMutation.finished.success,
  fn: () => [],
  target: [
    tasksProfileService.inputs.setSelectedTasks,
    tasksProfileService.inputs.refetchTasks,
  ],
});

export const reassignTasksService = {
  inputs: { openModal, closeModal },
  outputs: { $isModalOpen },
  gates: { ReassignTasksGate },
};
