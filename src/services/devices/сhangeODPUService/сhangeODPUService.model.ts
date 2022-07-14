import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { fetchHousingMeteringDevice } from './сhangeODPUService.api';

const domain = createDomain('changeODPUService');

const OldDeviceIdGate = createGate<{ oldDeviceId: number }>();

const $oldDevice = domain.createStore<ElectricHousingMeteringDeviceResponse | null>(
  null
);

const getHousingMeteringDeviceFx = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);

const $isLoading = getHousingMeteringDeviceFx.pending;

$oldDevice.on(getHousingMeteringDeviceFx.doneData, (_, device) => device);

forward({
  from: OldDeviceIdGate.state.map(({ oldDeviceId }) => oldDeviceId),
  to: getHousingMeteringDeviceFx,
});

export const сhangeODPUService = {
  inputs: {},
  outputs: {
    $oldDevice,
    $isLoading,
  },
  gates: {
    OldDeviceIdGate,
  },
};
