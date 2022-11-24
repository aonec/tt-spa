import { sendServiceZoneFx } from '01/features/serviceZones/addServiceZone/models';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
} from 'myApi';
import { fetchNode, fetchServiceZones } from './editNodeService.api';
import { NodeEditGrouptype } from './editNodeService.constants';

const domain = createDomain('editNodeService');

const setEditNodeGrouptype = domain.createEvent<NodeEditGrouptype>();
const $editNodeGrouptype = domain
  .createStore<NodeEditGrouptype>(NodeEditGrouptype.CommonInfo)
  .on(setEditNodeGrouptype, (_, grouptype) => grouptype);

const getNodeZonesFx = domain.createEffect<void, NodeServiceZoneListResponse>(
  fetchServiceZones
);
const $nodeZones = domain
  .createStore<NodeServiceZoneResponse[]>([])
  .on(getNodeZonesFx.doneData, (_, zones) => zones.nodeServiceZones || []);

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

export const editNodeService = {
  inputs: {
    setEditNodeGrouptype,
  },
  outputs: {
    $node,
    $isLoading,
    $editNodeGrouptype,
    $nodeZones,
  },
  gates: { NodeIdGate },
};
