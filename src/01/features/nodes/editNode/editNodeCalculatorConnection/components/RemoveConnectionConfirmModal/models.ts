import { createDomain } from 'effector';

const removeNodeCalculatorConnectionDomain = createDomain();

const $isConfirmModalOpen = removeNodeCalculatorConnectionDomain.createStore(
  false
);

const removeConnectionFx = removeNodeCalculatorConnectionDomain.createEffect(() => {});

const openConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

const closeConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

const removeConnectionButtonClicked = removeNodeCalculatorConnectionDomain.createEvent();

$isConfirmModalOpen
  .on(openConfirmationModal, () => true)
  .reset(closeConfirmationModal);

export const outputs = {
  $isConfirmModalOpen,
};

export const inputs = {
  openConfirmationModal,
  closeConfirmationModal,
  removeConnectionButtonClicked,
};
