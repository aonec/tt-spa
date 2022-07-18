import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { fetchElectricNode } from './editElectricNodeService.api';

const domain = createDomain('editElectricNodeService');

const $electricNode = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);
const getElectricNode = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchElectricNode);

$electricNode.on(getElectricNode.doneData, (_, node) => node);

const NodeIdGate = createGate<{ deviceId: number }>();

forward({
  from: NodeIdGate.state.map(({ deviceId }) => deviceId),
  to: getElectricNode,
});

export const editElectricNodeService = {
  inputs: {},
  outputs: { $electricNode },
  gates: {
    NodeIdGate,
  },
};
