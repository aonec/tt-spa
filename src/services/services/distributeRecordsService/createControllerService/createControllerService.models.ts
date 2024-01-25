import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createIndividualSealControllerMutation } from './createControllerService.api';
import { message } from 'antd';

const openCreateControllerModal = createEvent();
const closeCreateControllerModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openCreateControllerModal, () => true)
  .reset(closeCreateControllerModal);

createIndividualSealControllerMutation.finished.success.watch(({ params }) => {
  message.success(
    `Контролер ${params.firstName} ${params.lastName} успешно создан`,
  );
});

sample({
  clock: createIndividualSealControllerMutation.finished.success,
  target: closeCreateControllerModal,
});

export const createControllerService = {
  inputs: { openCreateControllerModal, closeCreateControllerModal },
  outputs: { $isModalOpen },
};
