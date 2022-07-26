import axios from '../../api/axios';
import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from '../../.../../api/types';

const nodeDomain = createDomain('node');

const $node = nodeDomain.createStore<PipeNodeResponse | null>(null);
const $readings = nodeDomain.createStore<boolean>(false);

const fetchNodeFx = nodeDomain.createEffect<number, PipeNodeResponse>((id) =>
  axios.get(`PipeNodes/${id}`)
);

const NodeGate = createGate<{ id: number }>();

const refetchNode = nodeDomain.createEvent();

$readings.on(
  fetchNodeFx.doneData,
  (_, node) =>
    node?.calculator === null || node?.calculator?.isConnected === false
);

$node.on(fetchNodeFx.doneData, (_, node) => node).reset(NodeGate.close);

forward({
  from: NodeGate.open.map(({ id }) => id),
  to: fetchNodeFx,
});

guard({
  source: $node.map((node) => Number(node?.id)),
  clock: refetchNode,
  filter: (id) => Boolean(id),
  target: fetchNodeFx,
});

export const inputs = {
  NodeGate,
  refetchNode,
};

export const outputs = {
  $node,
  $loading: fetchNodeFx.pending,
  $readings,
};

export const nodeService = {
  inputs,
  outputs,
  gates: {
    NodeGate,
  },
};
