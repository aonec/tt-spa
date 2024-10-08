import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { EditIndividualDeviceTabs } from './EditIndividualPage/EditIndividualPage.types';
import { createGate } from 'effector-react';
import {
  getIndividualDevice,
  putIndividualDevice,
} from './editIndividualDeviceService.api';
import {
  IndividualDeviceResponse,
  MeteringDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';

const FetchIndividualDeviceGate = createGate<{ deviceId: number }>();

const handleChangeTab = createEvent<EditIndividualDeviceTabs>();

const handleUpdateDevice = createEvent<{
  deviceId: number;
  payload: UpdateIndividualDeviceRequest;
}>();

const getDeviceFx = createEffect<number, IndividualDeviceResponse>(
  getIndividualDevice,
);

const putDeviceFx = createEffect<
  {
    deviceId: number;
    payload: UpdateIndividualDeviceRequest;
  },
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(putIndividualDevice);

const $individualDevice = createStore<IndividualDeviceResponse | null>(null).on(
  getDeviceFx.doneData,
  (_, device) => device,
);

sample({
  clock: FetchIndividualDeviceGate.open,
  source: FetchIndividualDeviceGate.state,
  fn: (gateState) => {
    return gateState.deviceId;
  },
  target: getDeviceFx,
});

sample({
  clock: handleUpdateDevice,
  target: putDeviceFx,
});

const $currentTab = createStore<EditIndividualDeviceTabs>(
  EditIndividualDeviceTabs.CommonInfo,
).on(handleChangeTab, (_, tab) => tab);

const $isDeviceLoading = getDeviceFx.pending;
const $isDeviceUpdating = putDeviceFx.pending;

const updateDeviceSuccess = putDeviceFx.doneData;
const updateDeviceFail = putDeviceFx.failData;

updateDeviceSuccess.watch(() => message.success('ИПУ успешно обновлён'));

updateDeviceFail.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const editIndividualDeviceService = {
  inputs: { handleChangeTab, handleUpdateDevice, updateDeviceSuccess },
  outputs: {
    $currentTab,
    $individualDevice,
    $isDeviceLoading,
    $mountPlaces:
      individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
    $isDeviceUpdating,
  },
  gates: { FetchIndividualDeviceGate },
};
