import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { prepareFilterBeforeSenging } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.utils';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import {
  fetchHousingStockIdQuery,
  fetchStatisticsByHouse,
} from './displayStatisticsListByHousesService.api';
import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import { SubscriberStatisticsСonsumptionResponse } from 'api/types';
import { HousingStockAddressForm } from './displayStatisticsListByHousesService.types';
import { createGate } from 'effector-react';

const StatisticsByHouseGate = createGate();

const setHousingStockAddress = createEvent<Partial<HousingStockAddressForm>>();
const $housingStockAddress = createStore<Partial<HousingStockAddressForm>>({})
  .on(setHousingStockAddress, (_, address) => address)
  .reset(StatisticsByHouseGate.close);

const $selectedHousingStockId = fetchHousingStockIdQuery.$data;

const getConsumptionStatisticsByHouseFx = createEffect<
  SubscriberStatisticsFilter,
  SubscriberStatisticsСonsumptionResponse[]
>(fetchStatisticsByHouse);
const $consumptionStatisticsByHouse = createStore<
  SubscriberStatisticsСonsumptionResponse[]
>([])
  .on(getConsumptionStatisticsByHouseFx.doneData, (_, statistics) => statistics)
  .reset([
    getConsumptionStatisticsByHouseFx.failData,
    StatisticsByHouseGate.close,
  ]);

const setSubscriberStatisticsFilter = createEvent<SubscriberStatisticsForm>();

const $subscriberStatisticsByHouseFilter =
  createStore<SubscriberStatisticsForm | null>(null)
    .on(setSubscriberStatisticsFilter, (_, filter) => filter)
    .reset(StatisticsByHouseGate.close);

const $isLoading = getConsumptionStatisticsByHouseFx.pending;

sample({
  clock: combine(
    $selectedHousingStockId,
    $subscriberStatisticsByHouseFilter,
    (HousingStockId, filter) => {
      if (!HousingStockId) {
        return null;
      }
      if (!filter) {
        return { HousingStockId };
      }
      const preparedData = prepareFilterBeforeSenging({
        ...filter,
        HousingStockId,
      });
      return { ...preparedData };
    },
  ),
  filter: Boolean,
  target: getConsumptionStatisticsByHouseFx,
});

sample({
  clock: $housingStockAddress,
  filter: (address): address is HousingStockAddressForm =>
    Boolean(address.City && address.Street && address.BuildingNumber),
  target: fetchHousingStockIdQuery.start,
});

sample({
  clock: StatisticsByHouseGate.close,
  target: fetchHousingStockIdQuery.reset,
});

export const displayStatisticsListByHousesService = {
  inputs: {
    setSubscriberStatisticsFilter,
    setHousingStockAddress,
  },
  outputs: {
    $subscriberStatisticsByHouseFilter,
    $isLoading,
    $consumptionStatisticsByHouse,
    $selectedHousingStockId,
    $housingStockAddress,
  },
  gates: { StatisticsByHouseGate },
};
