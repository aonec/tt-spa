import { createDomain } from 'effector';
import { Stage } from './types';
import { createForm } from 'effector-forms';
import moment from 'moment';

const createCalcuatorDomain = createDomain();

const $isCreateCalculatorModalOpen = createCalcuatorDomain.createStore(false);

const $stage = createCalcuatorDomain.createStore<Stage>('1');

const nextStage = createCalcuatorDomain.createEvent();
const previousStage = createCalcuatorDomain.createEvent();

$stage
  .on(nextStage, (value) => String(Number(value) + 1) as Stage)
  .on(previousStage, (value) => String(Number(value) - 1) as Stage);

const openCreateCalculatorModal = createCalcuatorDomain.createEvent();
const closeCreateCalculatorModal = createCalcuatorDomain.createEvent();

$isCreateCalculatorModalOpen
  .on(openCreateCalculatorModal, () => true)
  .reset(closeCreateCalculatorModal);

const baseInfoAddNodeCalculatorConnectionForm = createForm({
  fields: {
    serialNumber: { init: null as number | null },
    futureCheckingDate: { init: null as string | null },
    lastCheckingDate: { init: null as string | null },
    infoId: { init: null as number | null },
  },
});

export const createCalcuatorService = {
  inputs: {
    openCreateCalculatorModal,
    closeCreateCalculatorModal,
    nextStage,
    previousStage,
  },
  outputs: {
    $isCreateCalculatorModalOpen,
    $stage,
  },
  forms: {
    baseInfo: baseInfoAddNodeCalculatorConnectionForm,
  },
};
