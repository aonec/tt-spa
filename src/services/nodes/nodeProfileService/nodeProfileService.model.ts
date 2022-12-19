import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from 'myApi';
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

const $isLoading = fetchPipeNodeFx.pending;

export const nodeProfileService = {
  outputs: {
    $pipeNode,
    $isLoading,
  },
  gates: {
    PipeNodeGate,
  },
};
