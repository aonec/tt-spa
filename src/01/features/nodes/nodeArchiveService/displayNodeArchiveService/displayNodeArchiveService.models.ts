import { createDomain } from 'effector';
import { nodeService } from '../../displayNode/models';
import { getNodeArchiveData } from './displayNodeArchiveService.api';
import {
  GetNodeArchiveDataRequestParams,
  LoadNodeArchiveDataPayload,
  NodeArchiveData,
} from './displayNodeArchiveService.types';

const displayNodeArchiveServiceDomain = createDomain(
  'displayNodeArchiveService'
);

const $nodeArchiveData = displayNodeArchiveServiceDomain.createStore<NodeArchiveData | null>(
  null
);

const fetchNodeArchiveDataFx = displayNodeArchiveServiceDomain.createEffect<
  GetNodeArchiveDataRequestParams,
  NodeArchiveData
>(getNodeArchiveData);

const loadNodeArchiveData = displayNodeArchiveServiceDomain.createEvent<LoadNodeArchiveDataPayload>();

const $loading = fetchNodeArchiveDataFx.pending;

export const displayNodeArchiveService = {
  inputs: {
    fetchNodeArchiveDataFx,
    loadNodeArchiveData,
  },
  outputs: {
    $nodeArchiveData,
    $loading,
    $node: nodeService.outputs.$node,
    $nodeId: nodeService.gates.NodeGate.state.map(({ id }) => id),
  },
};
