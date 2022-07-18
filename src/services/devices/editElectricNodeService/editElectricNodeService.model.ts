import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { fetchElectricNode, updateElectricHousingMeteringDevice } from './editElectricNodeService.api';
import { UpdateElectricHousingMeteringDevice } from './view/EditElectricNodePage/EditElectricNodePage.types';

const domain = createDomain('editElectricNodeService');

const $electricNode = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);
const getElectricNode = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchElectricNode);

const updateDevice = domain.createEvent<UpdateElectricHousingMeteringDevice>();
const updateDeviceFx = domain.createEffect<
  UpdateElectricHousingMeteringDevice,
  void
>(updateElectricHousingMeteringDevice);

$electricNode.on(getElectricNode.doneData, (_, node) => node);

const NodeIdGate = createGate<{ deviceId: number }>();

forward({
  from: updateDevice,
  to: updateDeviceFx,
});

forward({
  from: NodeIdGate.state.map(({ deviceId }) => deviceId),
  to: getElectricNode,
});

export const editElectricNodeService = {
  inputs: {
    updateDevice,
  },
  outputs: {
    $electricNode,
  },
  gates: {
    NodeIdGate,
  },
};
