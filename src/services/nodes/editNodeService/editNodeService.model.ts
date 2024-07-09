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
  deleteNodeServiceZone,
  fetchNode,
  fetchServiceZones,
  fetchUpdateNode,
} from './editNodeService.api';
import { NodeEditGrouptype } from './editNodeService.constants';
import { addHosuingMeteringDeviceService } from './view/EditNodePage/addHosuingMeteringDeviceService';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const clearStore = createEvent();

const handleDeleteServiceZone = createEvent<NodeServiceZoneResponse | null>();
const handleFinallyDeleteServiceZone = createEvent<number>();

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

const deleteNodeServiceZoneFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(deleteNodeServiceZone);

const successDeleteServiceZone = deleteNodeServiceZoneFx.doneData;

const NodeIdGate = createGate<{ nodeId: string }>();

const NodeResourceGate = createGate<{ resource: EResourceType }>();

const $isLoading = getNodeFx.pending;
const $isUpdateLoading = updateNodeFx.pending;

sample({
  clock: NodeIdGate.close,
  target: clearStore,
});

const $nodeId = NodeIdGate.state.map(({ nodeId }) => nodeId || null);

const $deletingServiceZone = createStore<NodeServiceZoneResponse | null>(
  null,
).on(handleDeleteServiceZone, (_, data) => data);

const $isDeleteServiceZoneDialogOpen = $deletingServiceZone.map(Boolean);

sample({
  source: $nodeId,
  filter: Boolean,
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
  clock: [
    createNodeServiceZoneService.inputs.createNodeServiceZoneFx.doneData,
    successDeleteServiceZone,
  ],
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
  source: $nodeId,
  filter: Boolean,
  clock: updateNode,
  fn: (pipeNodeId, payload) => ({ pipeNodeId, payload }),
  target: updateNodeFx,
});

sample({
  clock: handleFinallyDeleteServiceZone,
  target: deleteNodeServiceZoneFx,
});

updateNodeFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

deleteNodeServiceZoneFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Ошибка удаления',
  );
});

export const editNodeService = {
  inputs: {
    setEditNodeGrouptype,
    refetchNode,
    updateNode,
    successDeleteServiceZone,
    handleDeleteServiceZone,
    handleFinallyDeleteServiceZone,
  },
  outputs: {
    $node,
    $isLoading,
    $editNodeGrouptype,
    $nodeZones,
    $isUpdateLoading,
    $deletingServiceZone,
    $isDeleteServiceZoneDialogOpen,
  },
  gates: { NodeIdGate, NodeResourceGate },
};
