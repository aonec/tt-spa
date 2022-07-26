import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import {
  fetchElectricNode,
  updateElectricHousingMeteringDevice,
} from './editElectricNodeService.api';
import { EditElectricNodePayload } from './editElectricNodeService.types';

const domain = createDomain('editElectricNodeService');

const $electricNode = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);
const getElectricNode = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchElectricNode);
const refetchElectricNode = domain.createEvent<number>();

const updateDevice = domain.createEvent<EditElectricNodePayload>();
const updateDeviceFx = domain.createEffect<
EditElectricNodePayload,
  void
>(updateElectricHousingMeteringDevice);

$electricNode.on(getElectricNode.doneData, (_, node) => node);

const $isLoadingUpdate = updateDeviceFx.pending;
const $isLoadingDevice = getElectricNode.pending;

const NodeIdGate = createGate<{ deviceId: number }>();

forward({
  from: updateDevice,
  to: updateDeviceFx,
});

forward({
  from: refetchElectricNode,
  to: getElectricNode,
});

sample({
  source: NodeIdGate.state,
  clock: updateDeviceFx.done,
  fn: ({ deviceId }) => deviceId,
  target: refetchElectricNode,
});

forward({
  from: NodeIdGate.open.map(({ deviceId }) => deviceId),
  to: getElectricNode,
});

export const editElectricNodeService = {
  inputs: {
    updateDevice,
  },
  outputs: {
    $electricNode,
    $isLoadingUpdate,
    $isLoadingDevice,
  },
  gates: {
    NodeIdGate,
  },
};
