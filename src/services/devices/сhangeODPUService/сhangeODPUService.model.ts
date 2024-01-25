import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { EffectFailDataAxiosError } from '../../../types/index';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ElectricHousingMeteringDeviceResponse,
  SwitchElectricHousingDeviceRequest,
} from 'api/types';
import {
  fetchHousingMeteringDevice,
  postSwitchHousingMeteringDevice,
} from './сhangeODPUService.api';

const OldDeviceIdGate = createGate<{ oldDeviceId: number }>();

const $oldDevice = createStore<ElectricHousingMeteringDeviceResponse | null>(
  null,
);

const getHousingMeteringDeviceFx = createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);

const switchHousingMeteringDeviceFx = createEffect<
  SwitchElectricHousingDeviceRequest,
  void,
  EffectFailDataAxiosError
>(postSwitchHousingMeteringDevice);

const switchHousingMeteringDevice =
  createEvent<SwitchElectricHousingDeviceRequest>();

const $isLoadingDevice = getHousingMeteringDeviceFx.pending;
const $isLoadingSwitch = switchHousingMeteringDeviceFx.pending;

$oldDevice.on(getHousingMeteringDeviceFx.doneData, (_, device) => device);

sample({
  clock: OldDeviceIdGate.state.map(({ oldDeviceId }) => oldDeviceId),
  target: getHousingMeteringDeviceFx,
});

sample({
  clock: switchHousingMeteringDevice,
  target: switchHousingMeteringDeviceFx,
});

switchHousingMeteringDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

switchHousingMeteringDeviceFx.doneData.watch(() =>
  message.success('Прибор успешно заменен!'),
);

export const сhangeODPUService = {
  inputs: {
    switchHousingMeteringDevice,
    switchHousingMeteringDeviceFx,
  },
  outputs: {
    $oldDevice,
    $isLoadingDevice,
    $isLoadingSwitch,
  },
  gates: {
    OldDeviceIdGate,
  },
};
