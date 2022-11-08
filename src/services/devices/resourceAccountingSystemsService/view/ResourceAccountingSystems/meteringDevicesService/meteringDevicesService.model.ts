import { createDomain, guard, sample } from 'effector';
import { PipeNodeMeteringDeviceResponse } from 'myApi';
import { getMeteringDevices } from './meteringDevicesService.api';

const domain = createDomain('meteringDevicesService');

const openDevicesListModal = domain.createEvent<number>();

const closeDevicesListModel = domain.createEvent();

const clearMeteringDevicesList = domain.createEvent();

const fetchMeteringDevices = domain.createEffect<
  number,
  PipeNodeMeteringDeviceResponse[]
>(getMeteringDevices);

const $pipeNodeId = domain
  .createStore<number | null>(null)
  .on(openDevicesListModal, (_, id) => id)
  .reset(closeDevicesListModel);

const $meterindDevicesList = domain
  .createStore<PipeNodeMeteringDeviceResponse[] | null>(null)
  .on(fetchMeteringDevices.doneData, (_, meteringDevices) => meteringDevices)
  .reset(clearMeteringDevicesList);

guard({
  clock: $pipeNodeId,
  filter: (id) => !id,
  target: clearMeteringDevicesList,
});

guard({
  clock: $pipeNodeId,
  filter: (id): id is number => typeof id === 'number',
  target: fetchMeteringDevices,
});

const $isModalOpen = $pipeNodeId.map(Boolean);

const $isLoading = fetchMeteringDevices.pending;

export const meteringDevicesService = {
  inputs: {
    openDevicesListModal,
    closeDevicesListModel,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $meterindDevicesList,
  },
};
