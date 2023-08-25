import { message } from 'antd';
import { combine, createDomain, forward, sample } from 'effector';
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

const domain = createDomain('editHousingMeteringDeviceService');

const handleChangeTab = domain.createEvent<EditHousingMeteringDeviceTabs>();
const $currentTab = domain
  .createStore<EditHousingMeteringDeviceTabs>(
    EditHousingMeteringDeviceTabs.CommonInfo,
  )
  .on(handleChangeTab, (_, tab) => tab);

const handleHousingMeteringDeviceUpdate =
  housingMeteringDeviceProfileService.inputs.handleHousingMeteringDeviceUpdate;

const handleSubmitForm =
  domain.createEvent<UpdatePipeHousingMeteringDeviceRequest>();

const getHousingMeteringDeviceFx = domain.createEffect<
  number,
  PipeHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);
const $housingMeteringDevice = domain
  .createStore<PipeHousingMeteringDeviceResponse | null>(null)
  .on(getHousingMeteringDeviceFx.doneData, (_, device) => device);

const getPipesFx = domain.createEffect<number, PipeNodeResponse>(fetchPipeNode);
const $communicationPipes = domain
  .createStore<CommunicationPipeResponse[]>([])
  .on(getPipesFx.doneData, (_, pipeNode) => pipeNode.communicationPipes || []);

const editHousingMeteringDeviceFx = domain.createEffect<
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
  clock: $housingMeteringDevice.map((device) => device?.hubConnection?.nodeId),
  filter: Boolean,
  target: getPipesFx,
});

sample({
  source: EditMeteringDeviceGate.state.map(({ deviceId }) => deviceId),
  clock: handleSubmitForm,
  fn: (deviceId, payload) => ({ deviceId, ...payload }),
  target: editHousingMeteringDeviceFx,
});

forward({
  from: EditMeteringDeviceGate.open.map(({ deviceId }) => deviceId),
  to: getHousingMeteringDeviceFx,
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
