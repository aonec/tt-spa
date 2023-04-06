import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import {
  fetchElectricNode,
  updateElectricHousingMeteringDevice,
} from './editElectricNodeService.api';
import { EditElectricNodePayload } from './editElectricNodeService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('editElectricNodeService');

const $electricNode =
  domain.createStore<ElectricHousingMeteringDeviceResponse | null>(null);
const getElectricNodeFx = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchElectricNode);
const refetchElectricNode = domain.createEvent<number>();

const updateDevice = domain.createEvent<EditElectricNodePayload>();
const updateDeviceFx = domain.createEffect<
  EditElectricNodePayload,
  void,
  EffectFailDataAxiosError
>(updateElectricHousingMeteringDevice);

$electricNode.on(getElectricNodeFx.doneData, (_, node) => node);

const $isLoadingUpdate = updateDeviceFx.pending;
const $isLoadingDevice = getElectricNodeFx.pending;

const NodeIdGate = createGate<{ deviceId: number }>();

forward({
  from: updateDevice,
  to: updateDeviceFx,
});

forward({
  from: refetchElectricNode,
  to: getElectricNodeFx,
});

sample({
  source: NodeIdGate.state,
  clock: updateDeviceFx.done,
  fn: ({ deviceId }) => deviceId,
  target: refetchElectricNode,
});

forward({
  from: NodeIdGate.open.map(({ deviceId }) => deviceId),
  to: getElectricNodeFx,
});

const handleSuccessUpdateDevice = updateDeviceFx.doneData;

handleSuccessUpdateDevice.watch(() =>
  message.success('Успешно отредактировано!'),
);

updateDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const editElectricNodeService = {
  inputs: {
    updateDevice,
    handleSuccessUpdateDevice,
  },
  outputs: {
    $electricNode,
    $isLoadingUpdate,
    $isLoadingDevice,
  },
  gates: {
    NodeIdGate,
  },
};