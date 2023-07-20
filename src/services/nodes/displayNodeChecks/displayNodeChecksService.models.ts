import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { NodeCheckResponse, NodeCheckResponsePagedList } from 'api/types';
import { fetchNodeChecks } from './displayNodeChecksService.api';

const domain = createDomain('displayNodeChecksService');

const refetchNodeChecks = domain.createEvent();
const getNodeChecksFx = domain.createEffect<number, NodeCheckResponsePagedList>(
  fetchNodeChecks,
);
const $nodeChecks = domain
  .createStore<NodeCheckResponse[]>([])
  .on(getNodeChecksFx.doneData, (_, pagedData) => pagedData?.items || []);

const NodeChecksGate = createGate<{ nodeId: number }>();

sample({
  clock: NodeChecksGate.open.map(({ nodeId }) => nodeId),
  target: getNodeChecksFx,
});

sample({
  source: NodeChecksGate.state.map(({ nodeId }) => nodeId),
  clock: refetchNodeChecks,
  target: getNodeChecksFx,
});

export const displayNodeChecksService = {
  inputs: {
    refetchNodeChecks,
  },
  outputs: {
    $nodeChecks,
    $loading: getNodeChecksFx.pending,
  },
  gates: { NodeChecksGate },
};
