import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse } from 'myApi';
import { fetchNode } from './editNodeService.api';
import { NodeEditGrouptype } from './editNodeService.constants';

const domain = createDomain('editNodeService');

const setEditNodeGrouptype = domain.createEvent<NodeEditGrouptype>();
const $editNodeGrouptype = domain
  .createStore<NodeEditGrouptype>(NodeEditGrouptype.CommonInfo)
  .on(setEditNodeGrouptype, (_, grouptype) => grouptype);

const getNodeFx = domain.createEffect<string, PipeNodeResponse>(fetchNode);
const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, node) => node);

const NodeIdGate = createGate<{ nodeId: string }>();

const $isLoading = getNodeFx.pending;

forward({
  from: NodeIdGate.open.map(({ nodeId }) => nodeId),
  to: getNodeFx,
});

export const editNodeService = {
  inputs: {
    setEditNodeGrouptype,
  },
  outputs: {
    $node,
    $isLoading,
    $editNodeGrouptype,
  },
  gates: { NodeIdGate },
};
