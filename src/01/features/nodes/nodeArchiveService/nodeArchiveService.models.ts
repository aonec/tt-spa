import { nodeService } from '../displayNode/models/index';

export const nodeArchiveService = {
  outputs: {
    $node: nodeService.outputs.$node,
    $loadingNode: nodeService.outputs.$loading,
  },
  inputs: {
    NodeGate: nodeService.inputs.NodeGate,
  },
};
