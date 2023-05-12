import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  EResourceType,
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'myApi';
import { createNodeServiceZoneService } from 'services/nodes/createNodeServiceZoneService';
import {
  fetchNode,
  fetchServiceZones,
  fetchUpdateNode,
} from './editNodeService.api';
import { NodeEditGrouptype } from './editNodeService.constants';
import { addHosuingMeteringDeviceService } from './view/EditNodePage/addHosuingMeteringDeviceService';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('editNodeService');

const clearStore = domain.createEvent();

const setEditNodeGrouptype = domain.createEvent<NodeEditGrouptype>();
const $editNodeGrouptype = domain
  .createStore<NodeEditGrouptype>(NodeEditGrouptype.CommonInfo)
  .on(setEditNodeGrouptype, (_, grouptype) => grouptype)
  .reset(clearStore);

const getNodeZonesFx = domain.createEffect<void, NodeServiceZoneListResponse>(
  fetchServiceZones,
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
const updateNodeFx = domain.createEffect<
  {
    pipeNodeId: string;
    payload: UpdatePipeNodeRequest;
  },
  void,
  EffectFailDataAxiosError
>(fetchUpdateNode);

refetchNode.watch(() => console.log('refetch'));

const NodeIdGate = createGate<{ nodeId: string }>();

const NodeResourceGate = createGate<{ resource: EResourceType }>();

const $isLoading = getNodeFx.pending;
const $isUpdateLoading = updateNodeFx.pending;

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
  from: createNodeServiceZoneService.inputs.createNodeServiceZoneFx.doneData,
  to: getNodeZonesFx,
});

forward({
  from: [
    addHosuingMeteringDeviceService.inputs.deviceCreated,
    updateNodeFx.doneData,
  ],
  to: refetchNode,
});

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: updateNode,
  fn: (pipeNodeId, payload) => ({ pipeNodeId, payload }),
  target: updateNodeFx,
});

updateNodeFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
    $isUpdateLoading,
  },
  gates: { NodeIdGate, NodeResourceGate },
};
