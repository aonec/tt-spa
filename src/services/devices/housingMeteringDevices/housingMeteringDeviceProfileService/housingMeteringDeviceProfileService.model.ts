import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'myApi';
import {
  getDeviceTasks,
  getHousingMeteringDevice,
} from './housingMeteringDeviceProfileService.api';
import { HousingProfileTabs } from './housingMeteringDeviceProfileService.types';
import { checkHousingMeteringDeviceService } from '../checkHousingMeteringDeviceService';
import { closeHousingMeteringDeviceService } from '../closeHousingMeteringDeviceService';

const domain = createDomain('housingMeteringDeviceProfileService');

const handleChangeTab = domain.createEvent<HousingProfileTabs>();

const handleHousingMeteringDeviceUpdate = domain.createEvent();

const handleCheckDateUpdate =
  checkHousingMeteringDeviceService.inputs.handleUpdateDevice;

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
      FetchHousingMeteringDeviceGate.state,
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
  clock: FetchHousingMeteringDeviceGate.open,
  fn: ({ deviceId }) => Number(deviceId),
  target: fetchHousingMeteringDeviceTasksFx,
});

sample({
  source: $housingMeteringDevice,
  clock: [handleHousingMeteringDeviceUpdate, handleCheckDateUpdate],
  fn: (device) => Number(device?.id),
  target: fetchHousingMeteringDeviceFx,
});

const $pending = fetchHousingMeteringDeviceFx.pending;

const $tasksPending = fetchHousingMeteringDeviceTasksFx.pending;

export const housingMeteringDeviceProfileService = {
  inputs: {
    handleChangeTab,
    handleHousingMeteringDeviceUpdate,
    handleCheckModalOpen:
      checkHousingMeteringDeviceService.inputs.handleOpenModal,
    handleDeviceClosingModalOpen:
      closeHousingMeteringDeviceService.inputs.handleOpenModal,
  },
  outputs: {
    $housingMeteringDevice,
    $currentTab,
    $housingMeteringDeviceTask,
    $pending,
    $tasksPending,
  },
  gates: { FetchHousingMeteringDeviceGate },
};
