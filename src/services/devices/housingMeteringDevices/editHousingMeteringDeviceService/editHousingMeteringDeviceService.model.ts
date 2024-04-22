import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  CommunicationPipeResponse,
  MeteringDeviceResponse,
  PipeHousingMeteringDeviceResponse,
  PipeNodeResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { housingMeteringDeviceProfileService } from '../housingMeteringDeviceProfileService';
import {
  fetchHousingMeteringDevice,
  fetchPipeNode,
  putHousingMeteringDevice,
} from './editHousingMeteringDeviceService.api';
import { EditHousingMeteringDeviceTabs } from './editHousingMeteringDeviceService.types';

const handleChangeTab = createEvent<EditHousingMeteringDeviceTabs>();
const $currentTab = createStore<EditHousingMeteringDeviceTabs>(
  EditHousingMeteringDeviceTabs.CommonInfo,
).on(handleChangeTab, (_, tab) => tab);

const handleHousingMeteringDeviceUpdate =
  housingMeteringDeviceProfileService.inputs.handleHousingMeteringDeviceUpdate;

const handleSubmitForm = createEvent<UpdatePipeHousingMeteringDeviceRequest>();

const getHousingMeteringDeviceFx = createEffect<
  number,
  PipeHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);
const $housingMeteringDevice =
  createStore<PipeHousingMeteringDeviceResponse | null>(null).on(
    getHousingMeteringDeviceFx.doneData,
    (_, device) => device,
  );

const getPipesFx = createEffect<number, PipeNodeResponse>(fetchPipeNode);
const $communicationPipes = createStore<CommunicationPipeResponse[]>([]).on(
  getPipesFx.doneData,
  (_, pipeNode) => pipeNode.communicationPipes || [],
);

const editHousingMeteringDeviceFx = createEffect<
  { deviceId: number } & UpdatePipeHousingMeteringDeviceRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(putHousingMeteringDevice);

const $isLoading = combine(
  getPipesFx.pending,
  getHousingMeteringDeviceFx.pending,
  (...isLoading) => isLoading.includes(true),
);

const EditMeteringDeviceGate = createGate<{ deviceId: number }>();

sample({
  clock: $housingMeteringDevice.map(
    (device) => device?.hubConnection?.node?.id || null,
  ),
  filter: Boolean,
  target: getPipesFx,
});

sample({
  clock: handleSubmitForm,
  source: EditMeteringDeviceGate.state.map(({ deviceId }) => deviceId, {
    skipVoid: false,
  }),
  filter: (id): id is number => Boolean(id),
  fn: (deviceId, payload) => ({ deviceId, ...payload }),
  target: editHousingMeteringDeviceFx,
});

sample({
  clock: EditMeteringDeviceGate.open.map(({ deviceId }) => deviceId),
  target: getHousingMeteringDeviceFx,
});

const successEditDevice = editHousingMeteringDeviceFx.doneData;

successEditDevice.watch(() => {
  message.success('ОДПУ успешно обновлен!');
  handleHousingMeteringDeviceUpdate();
});

editHousingMeteringDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const editHousingMeteringDeviceService = {
  inputs: {
    handleChangeTab,
    handleSubmitForm,
    successEditDevice,
  },
  outputs: {
    $currentTab,
    $housingMeteringDevice,
    $communicationPipes,
    $isLoading,
  },
  gates: {
    EditMeteringDeviceGate,
  },
};
