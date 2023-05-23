import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { getNodeArchiveData } from './displayNodeArchiveService.api';
import {
  GetNodeArchiveDataRequestParams,
  LoadNodeArchiveDataPayload,
  NodeArchiveData,
} from './displayNodeArchiveService.types';
import { nodeProfileService } from 'services/nodes/nodeProfileService';

const displayNodeArchiveServiceDomain = createDomain(
  'displayNodeArchiveService',
);

const $nodeArchiveData =
  displayNodeArchiveServiceDomain.createStore<NodeArchiveData | null>(null);

const fetchNodeArchiveDataFx = displayNodeArchiveServiceDomain.createEffect<
  GetNodeArchiveDataRequestParams,
  NodeArchiveData
>(getNodeArchiveData);

const loadNodeArchiveData =
  displayNodeArchiveServiceDomain.createEvent<LoadNodeArchiveDataPayload>();

const $loading = fetchNodeArchiveDataFx.pending;

const NodeArchiveGate = createGate();

export const displayNodeArchiveService = {
  inputs: {
    fetchNodeArchiveDataFx,
    loadNodeArchiveData,
    NodeArchiveGate,
  },
  outputs: {
    $nodeArchiveData,
    $loading,
    $node: nodeProfileService.outputs.$pipeNode,
    $nodeId: nodeProfileService.gates.PipeNodeGate.state.map(
      ({ pipeNodeId }) => pipeNodeId,
    ),
  },
};
