import axios from '01/axios';
import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import { UpdatePipeNodeRequest } from 'myApi';
import {
  outputs as nodeOutputs,
  inputs as nodeInputs,
} from '../../../../displayNode/models';

const removeNodeCalculatorConnectionDomain = createDomain();

const $isConfirmModalOpen = removeNodeCalculatorConnectionDomain.createStore(
  false
);

const removeConnectionFx = removeNodeCalculatorConnectionDomain.createEffect<
  UpdatePipeNodeRequest & { nodeId: number },
  void
>((payload) => {
  axios.put(`PipeNodes/${payload.nodeId}`, payload);
});

const openConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

const closeConfirmationModal = removeNodeCalculatorConnectionDomain.createEvent();

const removeConnectionButtonClicked = removeNodeCalculatorConnectionDomain.createEvent();

$isConfirmModalOpen
  .on(openConfirmationModal, () => true)
  .reset(closeConfirmationModal);

sample({
  clock: removeConnectionButtonClicked,
  source: nodeOutputs.$node,
  fn: (node) => ({
    resource: node?.resource,
    nodeId: node?.id!,
    disconnectFromCalculator: true,
    nodeStatus: node?.nodeStatus?.value,
    number: node?.number,
  }),
  target: removeConnectionFx,
});

forward({
  from: removeConnectionFx.doneData,
  to: [nodeInputs.refetchNode, closeConfirmationModal],
});

removeConnectionFx.doneData.watch(() => {
  message.info('Узел отключен от вычислителя');
});

export const outputs = {
  $isConfirmModalOpen,
  $loading: removeConnectionFx.pending,
};

export const inputs = {
  openConfirmationModal,
  closeConfirmationModal,
  removeConnectionButtonClicked,
};
