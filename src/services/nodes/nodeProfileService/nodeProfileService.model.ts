import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from 'myApi';
import { nodeCommercialRegistrationService } from '01/features/nodes/changeNodeStatusService/nodeCommercialRegistrationService/nodeCommercialRegistrationService.models';
import { getPipeNode } from './nodeProfileService.api';

const domain = createDomain('nodeProfileService');

const PipeNodeGate = createGate<{ pipeNodeId: number }>();

const fetchPipeNodeFx = domain.createEffect<number, PipeNodeResponse>(
  getPipeNode
);

const $pipeNode = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(fetchPipeNodeFx.doneData, (_, pipeNode) => pipeNode)
  .reset(PipeNodeGate.close);

forward({
  from: PipeNodeGate.open.map(({ pipeNodeId }) => pipeNodeId),
  to: fetchPipeNodeFx,
});

sample({
  source: PipeNodeGate.state.map(({ pipeNodeId }) => pipeNodeId),
  clock: nodeCommercialRegistrationService.inputs.handleStatusChanged,
  target: fetchPipeNodeFx,
});

const $isLoading = fetchPipeNodeFx.pending;

export const nodeProfileService = {
  inputs: {
    openRegisterNodeOnCommercialAccountingModal:
      nodeCommercialRegistrationService.inputs.openModal,
  },
  outputs: {
    $pipeNode,
    $isLoading,
  },
  gates: {
    PipeNodeGate,
  },
};
