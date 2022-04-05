import axios from '01/axios';
import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from '../../../../../myApi';

const nodeDomain = createDomain('node');

const $node = nodeDomain.createStore<PipeNodeResponse | null>(null);

const fetchNodeFx = nodeDomain.createEffect<number, PipeNodeResponse>((id) =>
  axios.get(`PipeNodes/${id}`)
);

const NodeGate = createGate<{ id: number }>();

const refetchNode = nodeDomain.createEvent();

$node
  .on(fetchNodeFx.doneData, (_, node) => node)
  .reset(NodeGate.close);

forward({
  from: NodeGate.open.map(({ id }) => id),
  to: fetchNodeFx,
});

guard({
  source: $node.map((node) => Number(node?.id)),
  clock: refetchNode,
  filter: (id) => Boolean(id),
  target: fetchNodeFx
})

export const inputs = {
  NodeGate,
  refetchNode,
};

export const outputs = {
  $node,
  $loading: fetchNodeFx.pending,
};

export const nodeService = {
  inputs,
  outputs,
};

export const nodeService = {
  inputs,
  outputs,
  gates: {
    NodeGate,
  },
};
