import axios from '01/axios';
import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import { UpdatePipeNodeRequest } from 'myApi';
import { editNodeService } from 'services/nodes/editNodeService';
import { EffectFailDataAxiosError } from 'types';

const removeNodeCalculatorConnectionDomain = createDomain();

const $isConfirmModalOpen =
  removeNodeCalculatorConnectionDomain.createStore(false);

const removeConnectionFx = removeNodeCalculatorConnectionDomain.createEffect<
  UpdatePipeNodeRequest & { nodeId: number },
  void,
  EffectFailDataAxiosError
>((payload) => {
  return axios.put(`PipeNodes/${payload.nodeId}`, payload);
});

const openConfirmationModal =
  removeNodeCalculatorConnectionDomain.createEvent();

const closeConfirmationModal =
  removeNodeCalculatorConnectionDomain.createEvent();

const removeConnectionButtonClicked =
  removeNodeCalculatorConnectionDomain.createEvent();

$isConfirmModalOpen
  .on(openConfirmationModal, () => true)
  .reset(closeConfirmationModal);

sample({
  clock: removeConnectionButtonClicked,
  source: editNodeService.outputs.$node,
  fn: (node) => ({
    resource: node?.resource,
    nodeId: node?.id!,
    disconnectFromCalculator: true,
    number: node?.number,
  }),
  target: removeConnectionFx,
});

forward({
  from: removeConnectionFx.doneData,
  to: [editNodeService.inputs.refetchNode, closeConfirmationModal],
});

removeConnectionFx.doneData.watch(() => {
  message.info('Узел отключен от вычислителя');
});

removeConnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
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

export const RemoveNodeCalculatorConnectionService = {
  inputs,
  outputs,
};
