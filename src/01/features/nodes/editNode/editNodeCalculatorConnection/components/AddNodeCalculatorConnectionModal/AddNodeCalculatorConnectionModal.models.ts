import { message } from 'antd';
import { createForm } from 'effector-forms';
import { createDomain, sample, forward } from 'effector';
import axios from '../../../../../../axios';
import { EffectFailDataAxiosError } from 'types';
import { editNodeService } from 'services/nodes/editNodeService';

const addNodeCalculatorConnection = createDomain('addNodeCalculatorConnection');

export const $isAddNodeCalculatorConnectionModalOpen =
  addNodeCalculatorConnection.createStore(false);

const openAddNodeCalculatorConnectionModal =
  addNodeCalculatorConnection.createEvent();

const closeAddNodeCalculatorConnectionModal =
  addNodeCalculatorConnection.createEvent();

const addNodeCalculatorConnectionForm = createForm({
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

const connectionSettingsForm = createForm({
  fields: {
    isConnected: { init: true },
    ipV4: { init: '' },
    port: { init: '' },
    deviceAddress: { init: '' },
  },
});

const saveNodeCalculatorConnectionFx = addNodeCalculatorConnection.createEffect<
  {
    calculatorId: number;
    entryNumber: number;
    nodeId: number;
  },
  void,
  EffectFailDataAxiosError
>((payload) => axios.put(`PipeNodes/${payload.nodeId}`, payload));

sample({
  source: editNodeService.outputs.$node,
  clock: addNodeCalculatorConnectionForm.formValidated,
  fn: (node, values) => ({
    calculatorId: values.calculatorId!,
    entryNumber: values.entryNumber!,
    nodeId: node?.id!,
    resource: node?.resource,
    number: node?.number,
  }),
  target: saveNodeCalculatorConnectionFx,
});

export type AddNodeCalculatorConnectionForm =
  typeof addNodeCalculatorConnectionForm;

export const addNodeCalculatorService = {
  inputs: {
    openAddNodeCalculatorConnectionModal,
    closeAddNodeCalculatorConnectionModal,
    addNodeCalculatorConnectionForm,
    connectionSettingsForm,
  },
  outputs: {
    $loading: saveNodeCalculatorConnectionFx.pending,
  },
};

saveNodeCalculatorConnectionFx.doneData.watch(() =>
  message.success('Вычислитель успешно подключен!'),
);

saveNodeCalculatorConnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

forward({
  from: saveNodeCalculatorConnectionFx.doneData,
  to: [
    editNodeService.inputs.refetchNode,
    closeAddNodeCalculatorConnectionModal,
  ],
});

forward({
  from: closeAddNodeCalculatorConnectionModal,
  to: addNodeCalculatorConnectionForm.resetValues,
});

sample({
  source: editNodeService.outputs.$node,
  clock: openAddNodeCalculatorConnectionModal,
  fn: (node) => ({
    calculatorId: node?.calculatorId,
    entryNumber: node?.entryNumber,
  }),
  target: addNodeCalculatorConnectionForm.setForm,
});

$isAddNodeCalculatorConnectionModalOpen
  .on(openAddNodeCalculatorConnectionModal, () => true)
  .reset(closeAddNodeCalculatorConnectionModal);
