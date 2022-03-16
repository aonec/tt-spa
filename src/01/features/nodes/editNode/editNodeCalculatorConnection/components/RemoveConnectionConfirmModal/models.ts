import { createDomain } from 'effector';

const removeNodeCalculatorConnectionDomain = createDomain();

const $isConfirmModalOpen = removeNodeCalculatorConnectionDomain.createStore(
  false
);

const openConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

const closeConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

$isConfirmModalOpen
  .on(openConfirmationModal, () => true)
  .reset(closeConfirmationModal);

export const outputs = {
  $isConfirmModalOpen,
};

export const inputs = {
  openConfirmationModal,
  closeConfirmationModal,
};
