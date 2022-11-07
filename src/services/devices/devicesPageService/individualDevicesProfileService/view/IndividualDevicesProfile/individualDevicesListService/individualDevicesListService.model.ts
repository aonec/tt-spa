import { createGate } from 'effector-react';
import { createDomain, guard, sample } from 'effector';
import { getIndividualDevicesList } from './individualDevicesListService.api';
import { IndividualDeviceResponseFromDevicePage } from 'myApi';

const domain = createDomain('individualDevicesListService');

const IndividualDevicesIds = createGate<{ devicesIds: number[] }>();

const toggleBlock = domain.createEvent<number>();

const fetchIndividualDevicesList = domain.createEffect(
  getIndividualDevicesList
);

const $individualDevicesList = domain
  .createStore<IndividualDeviceResponseFromDevicePage[] | null>(null)
  .on(fetchIndividualDevicesList.doneData, (_, data) => data);

const $openedBlockId = domain
  .createStore<number | null>(null)
  .on(toggleBlock, (prevId, id) => (prevId === id ? null : id));

const $isLoading = fetchIndividualDevicesList.pending;

sample({
  source: IndividualDevicesIds.state.map(({ devicesIds }) => devicesIds),
  clock: guard({
    source: $isLoading,
    clock: IndividualDevicesIds.state,
    filter: (isLoading) => !isLoading,
  }),
  target: fetchIndividualDevicesList,
});

export const individualDevicesListService = {
  inputs: { toggleBlock },
  outputs: { $openedBlockId, $isLoading, $individualDevicesList },
  gates: { IndividualDevicesIds },
};
