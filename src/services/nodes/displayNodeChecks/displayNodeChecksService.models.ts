import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { NodeCheckResponse, NodeCheckResponsePagedList } from 'api/types';
import { fetchNodeChecks } from './displayNodeChecksService.api';

const refetchNodeChecks = createEvent();
const getNodeChecksFx = createEffect<number, NodeCheckResponsePagedList>(
  fetchNodeChecks,
);
const $nodeChecks = createStore<NodeCheckResponse[]>([]).on(
  getNodeChecksFx.doneData,
  (_, pagedData) => pagedData?.items || [],
);

const NodeChecksGate = createGate<{ nodeId: number }>();

const $nodeId = NodeChecksGate.state.map(({ nodeId }) => nodeId || null);

sample({
  clock: NodeChecksGate.open,
  source: $nodeId,
  filter: Boolean,
  target: getNodeChecksFx,
});

sample({
  source: $nodeId,
  filter: Boolean,
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
