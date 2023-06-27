import { createDomain, sample } from 'effector';
import { removeAssignmentMutation } from './removeAssignmentService.api';
import { message } from 'antd';

const domain = createDomain('removeAssignmentService');

const closeModal = domain.createEvent();
const openModal = domain.createEvent<string>();
const $assignmentId = domain
  .createStore<string | null>(null)
  .on(openModal, (_, id) => id)
  .reset(closeModal);

const $isOpen = $assignmentId.map(Boolean);

const removeAssignment = domain.createEvent();
const assignmentRemoved = removeAssignmentMutation.finished.success;

sample({
  clock: assignmentRemoved,
  target: closeModal,
});

sample({
  source: $assignmentId,
  clock: removeAssignment,
  filter: Boolean,
  target: removeAssignmentMutation.start,
});

removeAssignmentMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

removeAssignmentMutation.finished.success.watch(() => {
  return message.success('Задание успешно расформировано!');
});

export const removeAssignmentService = {
  inputs: {
    openModal,
    closeModal,
    removeAssignment,
    assignmentRemoved,
  },
  outputs: {
    $isOpen,
    $assignmentId,
  },
};