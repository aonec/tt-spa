import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'myApi';
import {
  getDeviceTasks,
  getHousingMeteringDevice,
} from './housingMeteringDeviceProfileService.api';
import { HousingProfileTabs } from './housingMeteringDeviceProfileService.types';

const domain = createDomain('housingMeteringDeviceProfileService');

const handleChangeTab = domain.createEvent<HousingProfileTabs>();

const FetchHousingMeteringDeviceGate = createGate<{ deviceId: number }>();

const fetchHousingMeteringDeviceFx = domain.createEffect<
  number,
  PipeHousingMeteringDeviceResponse
>(getHousingMeteringDevice);

const fetchHousingMeteringDeviceTasksFx = domain.createEffect<
  number,
  TasksPagedList
>(getDeviceTasks);

// sample({
//   clock: FetchHousingMeteringDeviceGate.open,
//   fn: (data) => Number(data.deviceId),
//   target: [fetchHousingMeteringDeviceFx, fetchHousingMeteringDeviceTasksFx],
// });

const $housingMeteringDevice = domain
  .createStore<PipeHousingMeteringDeviceResponse | null>(null)
  .on(fetchHousingMeteringDeviceFx.doneData, (_, data) => data);

const $housingMeteringDeviceTask = domain
  .createStore<TasksPagedList | null>(null)
  .on(fetchHousingMeteringDeviceTasksFx.doneData, (_, data) => data);

const $currentTab = domain
  .createStore<HousingProfileTabs>(HousingProfileTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

sample({
  source: FetchHousingMeteringDeviceGate.state,
  clock: guard({
    source: combine(
      $housingMeteringDevice,
      FetchHousingMeteringDeviceGate.state
    ),
    clock: FetchHousingMeteringDeviceGate.open,
    filter: ([device, { deviceId }]) => {
      return Boolean(deviceId) && deviceId !== device?.id;
    },
  }),
  fn: ({ deviceId }) => Number(deviceId),
  target: fetchHousingMeteringDeviceFx,
});

export const housingMeteringDeviceProfileService = {
  inputs: { handleChangeTab },
  outputs: { $housingMeteringDevice, $currentTab, $housingMeteringDeviceTask },
  gates: { FetchHousingMeteringDeviceGate },
};
