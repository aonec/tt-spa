import { message } from 'antd';
import { nodeService } from './../../../../displayNode/models/index';
import { createForm } from 'effector-forms';
import { createDomain, sample, forward } from 'effector';
import axios from '../../../../../../../api/axios';

const addNodeCalculatorConnection = createDomain('addNodeCalculatorConnection');

export const $isAddNodeCalculatorConnectionModalOpen = addNodeCalculatorConnection.createStore(
  false
);

const openAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

const closeAddNodeCalculatorConnectionModal = addNodeCalculatorConnection.createEvent();

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
  void
>((payload) => axios.put(`PipeNodes/${payload.nodeId}`, payload));

sample({
  source: nodeService.outputs.$node,
  clock: addNodeCalculatorConnectionForm.formValidated,
  fn: (node, values) => ({
    calculatorId: values.calculatorId!,
    entryNumber: values.entryNumber!,
    nodeId: node?.id!,
    resource: node?.resource,
    nodeStatus: node?.nodeStatus?.value,
    number: node?.number,
  }),
  target: saveNodeCalculatorConnectionFx,
});

export type AddNodeCalculatorConnectionForm = typeof addNodeCalculatorConnectionForm;

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
  message.success('Вычислитель успешно подключен!')
);

saveNodeCalculatorConnectionFx.failData.watch(() =>
  message.error('Ошибка подключения вычислителя')
);

forward({
  from: saveNodeCalculatorConnectionFx.doneData,
  to: [nodeService.inputs.refetchNode, closeAddNodeCalculatorConnectionModal],
});

forward({
  from: closeAddNodeCalculatorConnectionModal,
  to: addNodeCalculatorConnectionForm.resetValues,
});

sample({
  source: nodeService.outputs.$node,
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
