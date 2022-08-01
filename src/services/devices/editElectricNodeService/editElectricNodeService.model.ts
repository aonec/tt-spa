import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from '../../../api/types';
import {
  fetchElectricNode,
  updateElectricHousingMeteringDevice,
} from './editElectricNodeService.api';
import { UpdateElectricHousingMeteringDevice } from './view/EditElectricNodePage/EditElectricNodePage.types';

const domain = createDomain('editElectricNodeService');

const $electricNode = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);
const getElectricNode = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchElectricNode);
const refetchElectricNode = domain.createEvent<number>();

const updateDevice = domain.createEvent<UpdateElectricHousingMeteringDevice>();
const updateDeviceFx = domain.createEffect<
  UpdateElectricHousingMeteringDevice,
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
