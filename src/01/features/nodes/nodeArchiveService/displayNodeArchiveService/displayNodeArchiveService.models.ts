import { createDomain } from 'effector';
import { nodeService } from '../../displayNode/models';
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
>();

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
  },
};
