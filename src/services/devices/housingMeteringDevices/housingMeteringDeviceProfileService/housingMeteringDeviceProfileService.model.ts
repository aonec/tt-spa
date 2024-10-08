import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'api/types';
import {
  getDeviceTasks,
  getHousingMeteringDevice,
} from './housingMeteringDeviceProfileService.api';
import { checkHousingMeteringDeviceService } from '../checkHousingMeteringDeviceService';
import { closeHousingMeteringDeviceService } from '../closeHousingMeteringDeviceService';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const handleHousingMeteringDeviceUpdate = createEvent();

const handleCheckDateUpdate =
  checkHousingMeteringDeviceService.inputs.handleUpdateDevice;

const FetchHousingMeteringDeviceGate = createGate<{ deviceId: number }>();

const fetchHousingMeteringDeviceFx = createEffect<
  number,
  PipeHousingMeteringDeviceResponse,
  EffectFailDataAxiosError
>(getHousingMeteringDevice);

const fetchHousingMeteringDeviceTasksFx = createEffect<number, TasksPagedList>(
  getDeviceTasks,
);

const $housingMeteringDevice =
  createStore<PipeHousingMeteringDeviceResponse | null>(null).on(
    fetchHousingMeteringDeviceFx.doneData,
    (_, data) => data,
  );

const $housingMeteringDeviceTask = createStore<TasksPagedList | null>(null).on(
  fetchHousingMeteringDeviceTasksFx.doneData,
  (_, data) => data,
);

sample({
  source: FetchHousingMeteringDeviceGate.state,
  clock: sample({
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
  filter: (device) => Boolean(device?.id),
  target: fetchHousingMeteringDeviceFx,
});

fetchHousingMeteringDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $pending = fetchHousingMeteringDeviceFx.pending;

const $tasksPending = fetchHousingMeteringDeviceTasksFx.pending;

export const housingMeteringDeviceProfileService = {
  inputs: {
    handleHousingMeteringDeviceUpdate,
    handleCheckModalOpen:
      checkHousingMeteringDeviceService.inputs.handleOpenModal,
    handleDeviceClosingModalOpen:
      closeHousingMeteringDeviceService.inputs.handleOpenModal,
  },
  outputs: {
    $housingMeteringDevice,
    $housingMeteringDeviceTask,
    $pending,
    $tasksPending,
  },
  gates: { FetchHousingMeteringDeviceGate },
};
