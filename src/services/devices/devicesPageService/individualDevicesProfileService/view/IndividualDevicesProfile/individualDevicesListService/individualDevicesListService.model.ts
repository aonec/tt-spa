import { createGate } from 'effector-react';
import { combine, createDomain, guard, sample } from 'effector';
import {
  getIndividualDeviceConsumptionsList,
  getIndividualDevicesList,
} from './individualDevicesListService.api';
import { IndividualDeviceResponseFromDevicePage } from 'myApi';
import { IndividualDeviceConsumptionGraphType } from './individualDevicesListService.constants';
import { IndividualDeviceConsumptionForGraph } from './individualDevicesListService.types';

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

const fetchIndividualDeviceConsumptionsListFx = domain.createEffect<
  number[],
  (IndividualDeviceConsumptionForGraph | null)[]
>(getIndividualDeviceConsumptionsList);
const $consumptionData = domain
  .createStore<IndividualDeviceConsumptionForGraph[]>([])
  .on(
    fetchIndividualDeviceConsumptionsListFx.doneData,
    (_, devicesList) =>
      devicesList.filter(Boolean) as IndividualDeviceConsumptionForGraph[],
  );

const $preparedData = combine($consumptionData, $graphType, (data, type) => {
  if (type === IndividualDeviceConsumptionGraphType.BySixMonths) {
    return data.map((device) => ({
      ...device,
      consumptions: device.consumptions.slice(6, 12),
    }));
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
const $isConsumptionsLoading = fetchIndividualDeviceConsumptionsListFx.pending;

sample({
  source: IndividualDevicesIds.state.map(({ devicesIds }) => devicesIds),
  clock: guard({
    source: $isLoading,
    clock: IndividualDevicesIds.state,
    filter: (isLoading) => !isLoading,
  }),
  target: [fetchIndividualDevicesList, fetchIndividualDeviceConsumptionsListFx],
});

export const individualDevicesListService = {
  inputs: { toggleBlock, selectGraphType },
  outputs: {
    $openedBlockId,
    $isLoading,
    $individualDevicesList,
    $graphType,
    $preparedData,
    $isConsumptionsLoading,
  },
  gates: { IndividualDevicesIds },
};
