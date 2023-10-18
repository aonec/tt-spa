import { createEffect, createEvent, createStore } from 'effector';
import { guard } from 'effector';
import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
  PipeNodeMeteringDeviceResponse,
} from 'api/types';
import { getMeteringDevices } from './meteringDevicesService.api';

const openDevicesListModal = createEvent<
  NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse
>();

const closeDevicesListModal = createEvent();

const clearMeteringDevicesList = createEvent();

const fetchMeteringDevices = createEffect<
  number,
  PipeNodeMeteringDeviceResponse[]
>(getMeteringDevices);

const $pipeNode = createStore<
  NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse | null
>(null)
  .on(openDevicesListModal, (_, node) => node)
  .reset(closeDevicesListModal);

const $meterindDevicesList = createStore<
  PipeNodeMeteringDeviceResponse[] | null
>(null)
  .on(fetchMeteringDevices.doneData, (_, meteringDevices) => meteringDevices)
  .reset(clearMeteringDevicesList);

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
    closeDevicesListModal,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $meterindDevicesList,
    $pipeNode,
  },
};
