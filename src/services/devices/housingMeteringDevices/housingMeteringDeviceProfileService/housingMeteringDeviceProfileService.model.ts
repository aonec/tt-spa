import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'myApi';
import { editHousingMeteringDeviceService } from '../editHousingMeteringDeviceService';
import {
  getDeviceTasks,
  getHousingMeteringDevice,
} from './housingMeteringDeviceProfileService.api';
import { HousingProfileTabs } from './housingMeteringDeviceProfileService.types';

const domain = createDomain('housingMeteringDeviceProfileService');

const handleChangeTab = domain.createEvent<HousingProfileTabs>();

const handleHousingMeteringDeviceUpdate = domain.createEvent();

const FetchHousingMeteringDeviceGate = createGate<{ deviceId: number }>();

const fetchHousingMeteringDeviceFx = domain.createEffect<
  number,
  PipeHousingMeteringDeviceResponse
>(getHousingMeteringDevice);

const fetchHousingMeteringDeviceTasksFx = domain.createEffect<
  number,
  TasksPagedList
>(getDeviceTasks);

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

sample({
  source: $housingMeteringDevice,
  clock: handleHousingMeteringDeviceUpdate,
  fn: (device) => Number(device?.id),
  target: fetchHousingMeteringDeviceFx,
});

const $pending = fetchHousingMeteringDeviceFx.pending;

export const housingMeteringDeviceProfileService = {
  inputs: { handleChangeTab, handleHousingMeteringDeviceUpdate },
  outputs: {
    $housingMeteringDevice,
    $currentTab,
    $housingMeteringDeviceTask,
    $pending,
  },
  gates: { FetchHousingMeteringDeviceGate },
};
