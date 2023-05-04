import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import { PipeNodeResponse, UpdatePipeNodeRequest } from 'myApi';
import { editNodeService } from 'services/nodes/editNodeService';
import { EffectFailDataAxiosError } from 'types';
import { fetchRemoveConnection } from './removeConnectionService.api';

const domain = createDomain('removeConnectionService');

const openModal = domain.createEvent<PipeNodeResponse>();
const closeModal = domain.createEvent();

const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);
const $isConfirmModalOpen = $node.map(Boolean);

const removeConnection = domain.createEvent();
const removeConnectionFx = domain.createEffect<
  UpdatePipeNodeRequest & { nodeId: number },
  void,
  EffectFailDataAxiosError
>(fetchRemoveConnection);

sample({
  source: sample({ source: $node, filter: Boolean }),
  clock: removeConnection,
  fn: (node) => ({
    resource: node.resource,
    nodeId: node.id,
    disconnectFromCalculator: true,
    number: node.number,
  }),
  target: removeConnectionFx,
});

forward({
  from: removeConnectionFx.doneData,
  to: [editNodeService.inputs.refetchNode, closeModal],
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
