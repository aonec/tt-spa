import { createDomain, forward, sample } from 'effector';
import { PipeHousingMeteringDeviceListResponse } from 'myApi';
import { message } from 'antd';
import { editNodeService } from '../editNodeService';
import { fetchDeletePipeDevice } from './deletePipeHousingMeteringDeviceService.api';

const domain = createDomain('deletePipeHousingMeteringDeviceService');

const deleteDevice = domain.createEvent();
const deleteDeviceFx = domain.createEffect<number, void>(fetchDeletePipeDevice);

const openModal = domain.createEvent<PipeHousingMeteringDeviceListResponse>();
const closeModal = domain.createEvent();

const $pipeMeteringDevice = domain
  .createStore<PipeHousingMeteringDeviceListResponse | null>(null)
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
