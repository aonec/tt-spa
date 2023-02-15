import { createGate } from 'effector-react';
import { createDomain, guard, sample } from 'effector';
import { getIndividualDevicesList } from './individualDevicesListService.api';
import { IndividualDeviceResponseFromDevicePage } from 'myApi';
import { IndividualDeviceConsumptionGraphType } from './individualDevicesListService.constants';

const domain = createDomain('individualDevicesListService');

const IndividualDevicesIds = createGate<{ devicesIds: number[] }>();

const toggleBlock = domain.createEvent<number>();

const fetchIndividualDevicesList = domain.createEffect(
  getIndividualDevicesList,
);

const selectGraphType =
  domain.createEvent<IndividualDeviceConsumptionGraphType>();
const $graphType = domain
  .createStore<IndividualDeviceConsumptionGraphType>(
    IndividualDeviceConsumptionGraphType.BySixMonths,
  )
  .on(selectGraphType, (_, type) => type);

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
  inputs: { toggleBlock, selectGraphType },
  outputs: {
    $openedBlockId,
    $isLoading,
    $individualDevicesList,
    $graphType,
  },
  gates: { IndividualDevicesIds },
};
