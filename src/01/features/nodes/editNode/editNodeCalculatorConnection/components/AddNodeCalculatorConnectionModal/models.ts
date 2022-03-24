import { createForm } from 'effector-forms';
import { createDomain } from 'effector';

const addNodeCalculatorConnection = createDomain('addNodeCalculatorConnection');

export const $isAddNodeCalculatorConnectionModalOpen = addNodeCalculatorConnection.createStore(
  false
);

export const openAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

export const closeAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

export const addNodeCalculatorConnectionForm = createForm({
  fields: {
    calculatorId: {
      init: null as number | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    entryNumber: {
      init: null as number | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
  },
});

$isAddNodeCalculatorConnectionModalOpen
  .on(openAddNodeCalculatorConnectionModal, () => true)
  .reset(closeAddNodeCalculatorConnectionModal);
