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

sample({
  clock: NodeChecksGate.open.map(({ nodeId }) => nodeId),
  target: getNodeChecksFx,
});

sample({
  source: NodeChecksGate.state.map(({ nodeId }) => nodeId || null),
  filter: (id): id is number => Boolean(id),
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
