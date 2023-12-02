import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  EResourceType,
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/types';
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

const clearStore = createEvent();

const setEditNodeGrouptype = createEvent<NodeEditGrouptype>();
const $editNodeGrouptype = createStore<NodeEditGrouptype>(
  NodeEditGrouptype.CommonInfo,
)
  .on(setEditNodeGrouptype, (_, grouptype) => grouptype)
  .reset(clearStore);

const getNodeZonesFx = createEffect<void, NodeServiceZoneListResponse>(
  fetchServiceZones,
);
const $nodeZones = createStore<NodeServiceZoneResponse[]>([]).on(
  getNodeZonesFx.doneData,
  (_, zones) => zones.nodeServiceZones || [],
);

const refetchNode = createEvent();
const getNodeFx = createEffect<string, PipeNodeResponse>(fetchNode);
const $node = createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, node) => node)
  .reset(clearStore);

const updateNode = createEvent<UpdatePipeNodeRequest>();
const updateNodeFx = createEffect<
  {
    pipeNodeId: string;
    payload: UpdatePipeNodeRequest;
  },
  void,
  EffectFailDataAxiosError
>(fetchUpdateNode);

const NodeIdGate = createGate<{ nodeId: string }>();

const NodeResourceGate = createGate<{ resource: EResourceType }>();

const $isLoading = getNodeFx.pending;
const $isUpdateLoading = updateNodeFx.pending;

sample({
  clock: NodeIdGate.close,
  target: clearStore,
});

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: [NodeIdGate.open, refetchNode],
  target: getNodeFx,
});

sample({
  source: $nodeZones,
  clock: NodeIdGate.open,
  filter: (zones) => zones.length === 0,
  target: getNodeZonesFx,
});

sample({
  clock: createNodeServiceZoneService.inputs.createNodeServiceZoneFx.doneData,
  target: getNodeZonesFx,
});

sample({
  clock: [
    addHosuingMeteringDeviceService.inputs.deviceCreated,
    updateNodeFx.doneData,
  ],
  target: refetchNode,
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
