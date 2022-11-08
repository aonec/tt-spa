import { createDomain, guard, sample } from 'effector';
import {
  NodeOnHousingStockResponse,
  PipeNodeMeteringDeviceResponse,
} from 'myApi';
import { getMeteringDevices } from './meteringDevicesService.api';

const domain = createDomain('meteringDevicesService');

const openDevicesListModal = domain.createEvent<NodeOnHousingStockResponse>();

const closeDevicesListModel = domain.createEvent();

const clearMeteringDevicesList = domain.createEvent();

const fetchMeteringDevices = domain.createEffect<
  number,
  PipeNodeMeteringDeviceResponse[]
>(getMeteringDevices);

const $pipeNode = domain
  .createStore<NodeOnHousingStockResponse | null>(null)
  .on(openDevicesListModal, (_, node) => node)
  .reset(closeDevicesListModel);

const $meterindDevicesList = domain
  .createStore<PipeNodeMeteringDeviceResponse[] | null>(null)
  .on(fetchMeteringDevices.doneData, (_, meteringDevices) => meteringDevices)
  .reset(clearMeteringDevicesList);

guard({
  clock: $pipeNode,
  filter: (id) => !id,
  target: clearMeteringDevicesList,
});

guard({
  clock: $pipeNode.map((node) => node?.id),
  filter: (id): id is number => typeof id === 'number',
  target: fetchMeteringDevices,
});

const $isModalOpen = $pipeNode.map(Boolean);

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
    $pipeNode,
  },
};
