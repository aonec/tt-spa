import { createDomain, forward } from 'effector';
import { createIndividualSealControllerMutation } from './createControllerService.api';
import { message } from 'antd';

const domain = createDomain('createControllerService');

const openCreateControllerModal = domain.createEvent();
const closeCreateControllerModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateControllerModal, () => true)
  .reset(closeCreateControllerModal);

createIndividualSealControllerMutation.finished.success.watch(({ params }) => {
  message.success(
    `Контролер ${params.firstName} ${params.lastName} успешно создан`,
  );
});

forward({
  from: createIndividualSealControllerMutation.finished.success,
  to: closeCreateControllerModal,
});

export const createControllerService = {
  inputs: { openCreateControllerModal, closeCreateControllerModal },
  outputs: { $isModalOpen },
};
