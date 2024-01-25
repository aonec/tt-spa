import { sample } from 'effector';
import { createGate } from 'effector-react';
import { changeNodeStatusService } from '../changeNodeStatusService';
import { changeNodeTypeService } from '../changeNodeTypeService';
import { getPipeNodeQuery } from './nodeProfileService.api';

const PipeNodeGate = createGate<{ pipeNodeId: number }>();

sample({
  clock: PipeNodeGate.close,
  target: getPipeNodeQuery.reset,
});

sample({
  clock: PipeNodeGate.open,
  target: getPipeNodeQuery.start,
});

sample({
  source: PipeNodeGate.state,
  clock: [
    changeNodeStatusService.inputs.changeNodeStatusFx.doneData,
    changeNodeTypeService.inputs.changeNodeTypeFx.doneData,
  ],
  target: getPipeNodeQuery.start,
});

export const nodeProfileService = {
  inputs: {
    openChangeNodeStatusModal: changeNodeStatusService.inputs.openModal,
    openChangeNodeTypeModal: changeNodeTypeService.inputs.openModal,
  },
  outputs: {
    $pipeNode: getPipeNodeQuery.$data,
    $isLoading: getPipeNodeQuery.$pending,
  },
  gates: {
    PipeNodeGate,
  },
};
