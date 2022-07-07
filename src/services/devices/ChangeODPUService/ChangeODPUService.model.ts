import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { fetchHousingMeteringDevice } from './ChangeODPUService.api';

const domain = createDomain('ChangeODPUService');

const OldDeviceIdGate = createGate<{ oldDeviceId: number }>();

const $oldDevice = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);

const getHousingMeteringDeviceFx = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);

$oldDevice.on(getHousingMeteringDeviceFx.doneData, (_, device) => device);

forward({
  from: OldDeviceIdGate.state.map(({ oldDeviceId }) => oldDeviceId),
  to: getHousingMeteringDeviceFx,
});

export const ChangeODPUService = {
  inputs: {},
  outputs: {
    $oldDevice,
  },
  gates: {
    OldDeviceIdGate,
  },
};

