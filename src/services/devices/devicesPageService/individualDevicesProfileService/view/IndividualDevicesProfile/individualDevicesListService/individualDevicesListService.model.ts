import { createGate } from 'effector-react';
import { combine, createDomain, guard, sample } from 'effector';
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

const fetchIndividualDeviceConsumptionsList = domain.createEffect();
const $consumptionData = domain.createStore([
  { consumption: 100, date: '2022-11-01T00:00:00' },
  { consumption: 450, date: '2022-10-01T00:00:00' },
  { consumption: 100, date: '2022-09-01T00:00:00' },
  { consumption: 300, date: '2022-08-01T00:00:00' },
  { consumption: 900, date: '2022-07-01T00:00:00' },
  { consumption: 80, date: '2022-06-01T00:00:00' },
  { consumption: 80, date: '2022-05-01T00:00:00' },
  { consumption: 100, date: '2022-04-01T00:00:00' },
  { consumption: 80, date: '2022-03-01T00:00:00' },
  { consumption: 80, date: '2022-02-01T00:00:00' },
  { consumption: 900, date: '2022-01-01T00:00:00' },
  { consumption: 80, date: '2021-12-01T00:00:00' },
]);

const $preparedData = combine($consumptionData, $graphType, (data, type) => {
  if (type === IndividualDeviceConsumptionGraphType.BySixMonths) {
    return data.slice(0, 6);
  }
  return data;
});

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
  target: [fetchIndividualDevicesList, fetchIndividualDeviceConsumptionsList],
});

export const individualDevicesListService = {
  inputs: { toggleBlock, selectGraphType },
  outputs: {
    $openedBlockId,
    $isLoading,
    $individualDevicesList,
    $graphType,
    $preparedData,
  },
  gates: { IndividualDevicesIds },
};
