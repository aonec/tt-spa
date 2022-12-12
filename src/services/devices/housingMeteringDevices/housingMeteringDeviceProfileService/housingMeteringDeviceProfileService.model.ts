import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse } from 'myApi';
import { getHousingMeteringDevice } from './housingMeteringDeviceProfileService.api';
import { HousingProfileTabs } from './housingMeteringDeviceProfileService.types';

const domain = createDomain('housingMeteringDeviceProfileService');

const handleChangeTab = domain.createEvent<HousingProfileTabs>();

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

const $currentTab = domain
  .createStore<HousingProfileTabs>(HousingProfileTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

export const housingMeteringDeviceProfileService = {
  inputs: { handleChangeTab },
  outputs: { $housingMeteringDevice, $currentTab },
  gates: { FetchHousingMeteringDeviceGate },
};
