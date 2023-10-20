import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { PipeHousingMeteringDeviceListResponse } from 'api/types';
import { message } from 'antd';
import { fetchDeletePipeDevice } from './deletePipeHousingMeteringDeviceService.api';
import { editNodeService } from 'services/nodes/editNodeService';

const deleteDevice = createEvent();
const deleteDeviceFx = createEffect<number, void>(fetchDeletePipeDevice);

const openModal = createEvent<PipeHousingMeteringDeviceListResponse>();
const closeModal = createEvent();

const $pipeMeteringDevice =
  createStore<PipeHousingMeteringDeviceListResponse | null>(null)
    .on(openModal, (_, device) => device)
    .reset(closeModal);
const $isOpen = $pipeMeteringDevice.map(Boolean);

deleteDeviceFx.doneData.watch(() => message.success('Прибор удален!'));

sample({
  source: $pipeMeteringDevice.map((device) => device?.id || null),
  clock: deleteDevice,
  filter: (id): id is number => Boolean(id),
  target: deleteDeviceFx,
});

forward({
  from: deleteDeviceFx.doneData,
  to: [closeModal, editNodeService.inputs.refetchNode],
});

export const deletePipeHousingMeteringDeviceService = {
  inputs: {
    openModal,
    closeModal,
    deleteDevice,
  },
  outputs: {
    $isOpen,
    $pipeMeteringDevice,
  },
};
