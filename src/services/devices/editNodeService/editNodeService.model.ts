import { sendServiceZoneFx } from '01/features/serviceZones/addServiceZone/models';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  EMagistralTypeStringDictionaryItem,
  EResourceType,
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'myApi';
import {
  fetchNode,
  fetchPipeNodeMagistrals,
  fetchServiceZones,
  fetchUpdateNode,
} from './editNodeService.api';
import { NodeEditGrouptype } from './editNodeService.constants';

const domain = createDomain('editNodeService');

const clearStore = domain.createEvent();

const getMagistralsFx = domain.createEffect<
  EResourceType,
  EMagistralTypeStringDictionaryItem[]
>(fetchPipeNodeMagistrals);

const $magistrals = domain
  .createStore<EMagistralTypeStringDictionaryItem[]>([])
  .on(getMagistralsFx.doneData, (_, magistrals) => magistrals)
  .reset(clearStore);

const setEditNodeGrouptype = domain.createEvent<NodeEditGrouptype>();
const $editNodeGrouptype = domain
  .createStore<NodeEditGrouptype>(NodeEditGrouptype.CommonInfo)
  .on(setEditNodeGrouptype, (_, grouptype) => grouptype)
  .reset(clearStore);

const getNodeZonesFx = domain.createEffect<void, NodeServiceZoneListResponse>(
  fetchServiceZones
);
const $nodeZones = domain
  .createStore<NodeServiceZoneResponse[]>([])
  .on(getNodeZonesFx.doneData, (_, zones) => zones.nodeServiceZones || []);

const refetchNode = domain.createEvent();
const getNodeFx = domain.createEffect<string, PipeNodeResponse>(fetchNode);
const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, node) => node)
  .reset(clearStore);

const updateNode = domain.createEvent<UpdatePipeNodeRequest>();
const updateNodeFx = domain.createEffect(fetchUpdateNode);

const NodeIdGate = createGate<{ nodeId: string }>();

const NodeResourceGate = createGate<{ resource: EResourceType }>();

const $isLoading = getNodeFx.pending;

forward({
  from: NodeResourceGate.state.map(({ resource }) => resource),
  to: getMagistralsFx,
});

forward({
  from: NodeIdGate.close,
  to: clearStore,
});

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: [NodeIdGate.open, refetchNode],
  target: getNodeFx,
});

guard({
  source: $nodeZones,
  clock: NodeIdGate.open,
  filter: (zones) => zones.length === 0,
  target: getNodeZonesFx,
});

forward({
  from: sendServiceZoneFx.doneData,
  to: getNodeZonesFx,
});

forward({
  from: updateNodeFx.doneData,
  to: refetchNode,
});

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: updateNode,
  fn: (pipeNodeId, payload) => ({ pipeNodeId, payload }),
  target: updateNodeFx,
});

export const editNodeService = {
  inputs: {
    setEditNodeGrouptype,
    refetchNode,
    updateNode,
  },
  outputs: {
    $node,
    $isLoading,
    $editNodeGrouptype,
    $nodeZones,
    $magistrals,
  },
  gates: { NodeIdGate, NodeResourceGate },
};
