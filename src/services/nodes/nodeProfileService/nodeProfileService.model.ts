import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from 'api/types';
import { changeNodeStatusService } from '../changeNodeStatusService';
import { changeNodeTypeService } from '../changeNodeTypeService';
import { getPipeNode } from './nodeProfileService.api';

const PipeNodeGate = createGate<{ pipeNodeId: number }>();

const fetchPipeNodeFx = createEffect<number, PipeNodeResponse>(getPipeNode);

const $pipeNode = createStore<PipeNodeResponse | null>(null)
  .on(fetchPipeNodeFx.doneData, (_, pipeNode) => pipeNode)
  .reset(PipeNodeGate.close);

sample({
  clock: PipeNodeGate.open.map(({ pipeNodeId }) => pipeNodeId),
  target: fetchPipeNodeFx,
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
