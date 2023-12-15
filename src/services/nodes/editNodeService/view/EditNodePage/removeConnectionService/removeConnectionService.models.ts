import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { PipeNodeResponse, UpdatePipeNodeRequest } from 'api/types';
import { editNodeService } from 'services/nodes/editNodeService';
import { EffectFailDataAxiosError } from 'types';
import { fetchRemoveConnection } from './removeConnectionService.api';

const openModal = createEvent<PipeNodeResponse>();
const closeModal = createEvent();

const $node = createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);
const $isConfirmModalOpen = $node.map(Boolean);

const removeConnection = createEvent();
const removeConnectionFx = createEffect<
  UpdatePipeNodeRequest & { nodeId: number },
  void,
  EffectFailDataAxiosError
>(fetchRemoveConnection);

sample({
  source: $node,
  filter: Boolean,
  clock: removeConnection,
  fn: (node) => ({
    resource: node.resource,
    nodeId: node.id,
    disconnectFromCalculator: true,
    number: node.number,
  }),
  target: removeConnectionFx,
});

sample({
  clock: removeConnectionFx.doneData,
  target: [editNodeService.inputs.refetchNode, closeModal],
});

removeConnectionFx.doneData.watch(() => {
  message.info('Узел отключен от вычислителя');
});

removeConnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const removeNodeCalculatorConnectionService = {
  inputs: {
    openModal,
    closeModal,
    removeConnection,
  },
  outputs: {
    $isConfirmModalOpen,
    $isLoading: removeConnectionFx.pending,
  },
};
