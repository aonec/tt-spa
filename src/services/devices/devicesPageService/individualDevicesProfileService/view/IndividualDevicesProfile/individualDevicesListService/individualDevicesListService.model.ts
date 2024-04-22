import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { combine, sample } from 'effector';
import {
  getIndividualDeviceConsumptionsList,
  getIndividualDevicesList,
} from './individualDevicesListService.api';
import { IndividualDeviceResponseFromDevicePage } from 'api/types';
import { IndividualDeviceConsumptionGraphType } from './individualDevicesListService.constants';
import { IndividualDeviceConsumptionForGraph } from './individualDevicesListService.types';

const IndividualDevicesIds = createGate<{ devicesIds: number[] }>();

const toggleBlock = createEvent<number>();

const fetchIndividualDevicesList = createEffect(getIndividualDevicesList);

const selectGraphType = createEvent<IndividualDeviceConsumptionGraphType>();
const $graphType = createStore<IndividualDeviceConsumptionGraphType>(
  IndividualDeviceConsumptionGraphType.BySixMonths,
).on(selectGraphType, (_, type) => type);

const fetchIndividualDeviceConsumptionsListFx = createEffect<
  number[],
  (IndividualDeviceConsumptionForGraph | null)[]
>(getIndividualDeviceConsumptionsList);
const $consumptionData = createStore<IndividualDeviceConsumptionForGraph[]>(
  [],
).on(
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

const $individualDevicesList = createStore<
  IndividualDeviceResponseFromDevicePage[] | null
>(null).on(fetchIndividualDevicesList.doneData, (_, data) => data);

const $openedBlockId = createStore<number | null>(null).on(
  toggleBlock,
  (prevId, id) => (prevId === id ? null : id),
);

const $isLoading = fetchIndividualDevicesList.pending;
const $isConsumptionsLoading = fetchIndividualDeviceConsumptionsListFx.pending;

sample({
  source: IndividualDevicesIds.state.map(({ devicesIds }) => devicesIds || []),
  clock: sample({
    source: $isLoading,
    clock: IndividualDevicesIds.state,
    filter: (isLoading, ids) => !isLoading && Boolean(ids?.devicesIds?.length),
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
