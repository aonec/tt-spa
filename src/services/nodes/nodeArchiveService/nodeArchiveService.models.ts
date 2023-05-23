import { nodeProfileService } from '../nodeProfileService';

export const nodeArchiveService = {
  outputs: {
    $node: nodeProfileService.outputs.$pipeNode,
    $loadingNode: nodeProfileService.outputs.$isLoading,
  },
  inputs: {
    NodeGate: nodeProfileService.gates.PipeNodeGate,
  },
};
