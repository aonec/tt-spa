import { createDomain, sample } from 'effector';
import { PipeHousingMeteringDeviceListResponse } from 'myApi';

const domain = createDomain('deleteHousingMeteringDeviceService');

const openModal = domain.createEvent<PipeHousingMeteringDeviceListResponse>();
const closeModal = domain.createEvent();

const $housingMeteringDevice = domain
  .createStore<PipeHousingMeteringDeviceListResponse | null>(null)
  .on(openModal, (_, device) => device)
  .reset(closeModal);

const $isOpen = $housingMeteringDevice.map(Boolean);

const deleteDevice = domain.createEvent();
const deleteDeviceFx = domain.createEffect<number, void>();

sample({
  source: sample({ source: $housingMeteringDevice, filter: Boolean }),
  fn: (device) => device.id,
  clock: deleteDevice,
  target: deleteDeviceFx,
});

export const deleteHousingMeteringDeviceService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $housingMeteringDevice,
    $isOpen,
  },
};
