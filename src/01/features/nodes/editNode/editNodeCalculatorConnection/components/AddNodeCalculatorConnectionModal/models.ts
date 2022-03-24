import { message } from 'antd';
import { nodeService } from './../../../../displayNode/models/index';
import axios from '01/axios';
import { createForm } from 'effector-forms';
import { createDomain, sample, forward } from 'effector';

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
  outputs: {
    $loading: saveNodeCalculatorConnectionFx.pending,
  },
};

saveNodeCalculatorConnectionFx.doneData.watch(() =>
  message.success('Вычислитель успешно подключен!А')
);

saveNodeCalculatorConnectionFx.failData.watch(() =>
  message.error('Ошибка подключения вычислителя')
);

forward({
  from: saveNodeCalculatorConnectionFx.doneData,
  to: [nodeService.inputs.refetchNode, closeAddNodeCalculatorConnectionModal],
});

$isAddNodeCalculatorConnectionModalOpen
  .on(openAddNodeCalculatorConnectionModal, () => true)
  .reset(closeAddNodeCalculatorConnectionModal);
