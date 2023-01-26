import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from 'myApi';
import { changeNodeStatusService } from '../changeNodeStatusService';
import { changeNodeTypeService } from '../changeNodeTypeService';
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
  clock: [
    changeNodeStatusService.inputs.changeNodeStatusFx.doneData,
    changeNodeTypeService.inputs.changeNodeTypeFx.doneData,
  ],
  target: fetchPipeNodeFx,
});

const $isLoading = fetchPipeNodeFx.pending;

export const nodeProfileService = {
  inputs: {
    openChangeNodeStatusModal: changeNodeStatusService.inputs.openModal,
    openChangeNodeTypeModal: changeNodeTypeService.inputs.openModal,
  },
  outputs: {
    $pipeNode,
    $isLoading,
  },
  gates: {
    PipeNodeGate,
  },
};
