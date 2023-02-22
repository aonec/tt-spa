import { message } from 'antd';
import { EffectFailDataAxiosError } from './../../../types/index';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ElectricHousingMeteringDeviceResponse,
  SwitchElectricHousingDeviceRequest,
} from 'myApi';
import {
  fetchHousingMeteringDevice,
  postSwitchHousingMeteringDevice,
} from './сhangeODPUService.api';

const domain = createDomain('changeODPUService');

const OldDeviceIdGate = createGate<{ oldDeviceId: number }>();

const $oldDevice =
  domain.createStore<ElectricHousingMeteringDeviceResponse | null>(null);

const getHousingMeteringDeviceFx = domain.createEffect<
  number,
  ElectricHousingMeteringDeviceResponse
>(fetchHousingMeteringDevice);

const switchHousingMeteringDeviceFx = domain.createEffect<
  SwitchElectricHousingDeviceRequest,
  void,
  EffectFailDataAxiosError
>(postSwitchHousingMeteringDevice);

const switchHousingMeteringDevice =
  domain.createEvent<SwitchElectricHousingDeviceRequest>();

const $isLoadingDevice = getHousingMeteringDeviceFx.pending;
const $isLoadingSwitch = switchHousingMeteringDeviceFx.pending;

$oldDevice.on(getHousingMeteringDeviceFx.doneData, (_, device) => device);

forward({
  from: OldDeviceIdGate.state.map(({ oldDeviceId }) => oldDeviceId),
  to: getHousingMeteringDeviceFx,
});

forward({
  from: switchHousingMeteringDevice,
  to: switchHousingMeteringDeviceFx,
});

switchHousingMeteringDeviceFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
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
