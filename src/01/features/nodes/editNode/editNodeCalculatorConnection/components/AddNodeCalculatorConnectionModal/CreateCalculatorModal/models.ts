import { createDomain } from 'effector';

const createCalcuatorDomain = createDomain();

const $isCreateCalculatorModalOpen = createCalcuatorDomain.createStore(false);

const openCreateCalculatorModal = createCalcuatorDomain.createEvent();
const closeCreateCalculatorModal = createCalcuatorDomain.createEvent();

$isCreateCalculatorModalOpen
  .on(openCreateCalculatorModal, () => true)
  .reset(closeCreateCalculatorModal);

export const createCalcuatorService = {
  inputs: {
    openCreateCalculatorModal,
    closeCreateCalculatorModal,
  },
  outputs: {
    $isCreateCalculatorModalOpen,
  },
};
