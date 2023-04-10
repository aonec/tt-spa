import { createDomain, sample } from 'effector';
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
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('editIndividualDeviceService');

const FetchIndividualDeviceGate = createGate<{ deviceId: number }>();

const handleChangeTab = domain.createEvent<EditIndividualDeviceTabs>();

const handleUpdateDevice = domain.createEvent<UpdateIndividualDeviceRequest>();

const getDeviceFx = domain.createEffect<number, IndividualDeviceResponse>(
  getIndividualDevice,
);

const putDeviceFx = domain.createEffect<
  {
    deviceId: number;
    payload: UpdateIndividualDeviceRequest;
  },
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(putIndividualDevice);

const $individualDevice = domain
  .createStore<IndividualDeviceResponse | null>(null)
  .on(getDeviceFx.doneData, (_, device) => device);

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
  source: FetchIndividualDeviceGate.state,
  fn: (gateState, formState) => {
    return { deviceId: gateState.deviceId, payload: formState };
  },
  target: putDeviceFx,
});

const $currentTab = domain
  .createStore<EditIndividualDeviceTabs>(EditIndividualDeviceTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

const $isDeviceLoading = getDeviceFx.pending;

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
  inputs: { handleChangeTab },
  outputs: { $currentTab, $individualDevice, $isDeviceLoading },
  gates: { FetchIndividualDeviceGate },
};
