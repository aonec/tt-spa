import { createDomain } from 'effector';

const addNodeCalculatorConnection = createDomain('addNodeCalculatorConnection');

export const $isAddNodeCalculatorConnectionModalOpen = addNodeCalculatorConnection.createStore(
  false
);

export const openAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

export const closeAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

$isAddNodeCalculatorConnectionModalOpen
  .on(openAddNodeCalculatorConnectionModal, () => true)
  .reset(closeAddNodeCalculatorConnectionModal);
