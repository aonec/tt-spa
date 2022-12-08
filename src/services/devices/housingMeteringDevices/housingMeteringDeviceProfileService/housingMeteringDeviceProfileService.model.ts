import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse } from 'myApi';
import { getHousingMeteringDevice } from './housingMeteringDeviceProfileService.api';

const domain = createDomain('housingMeteringDeviceProfileService');

const FetchHousingMeteringDeviceGate = createGate<{ deviceId: string }>();

const fetchHousingMeteringDeviceFx = domain.createEffect<
  number,
  PipeHousingMeteringDeviceResponse
>(getHousingMeteringDevice);

sample({
  clock: FetchHousingMeteringDeviceGate.open,
  fn: (data) => Number(data.deviceId),
  target: fetchHousingMeteringDeviceFx,
});

const $housingMeteringDevice = domain
  .createStore<PipeHousingMeteringDeviceResponse | null>(null)
  .on(fetchHousingMeteringDeviceFx.doneData, (_, data) => data);

export const housingMeteringDeviceProfileService = {
  inputs: {},
  outputs: { $housingMeteringDevice },
  gates: { FetchHousingMeteringDeviceGate },
};
