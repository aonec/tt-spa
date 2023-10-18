import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  BuildingListResponse,
  BuildingListResponsePagedList,
  HouseManagementWithStreetsResponse,
  SubscriberStatisticsСonsumptionResponse,
} from 'api/types';
import {
  fetchHousingStocksByManagingFirm,
  fetchManagingFirm,
  fetchSubscribersStatistic,
} from './displayStatisticsListByManagingFirmService.api';
import {
  HousingStockWithApartmentStatistic,
  SubscriberStatisticsFilter,
} from './displayStatisticsListByManagingFirmService.types';
import { prepareFilterBeforeSenging } from './displayStatisticsListByManagingFirmService.utils';
import { SubscriberStatisticsForm } from './view/ManagingFirmSearch/ManagingFirmSearch.types';
import _ from 'lodash';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const StatiscticsPageGate = createGate();

const getManagingFirmsFx = createEffect<
  string,
  HouseManagementWithStreetsResponse[]
>(fetchManagingFirm);
const $managingFirms = createStore<HouseManagementWithStreetsResponse[]>([]).on(
  getManagingFirmsFx.doneData,
  (_, managingFirms) => managingFirms,
);

const selectCity = createEvent<string>();
const $selectedCity = createStore<string>('').on(selectCity, (_, city) => city);

const selectManagingFirm = createEvent<string>();
const $selectedManagingFirm = createStore<string>('')
  .on(selectManagingFirm, (_, managingFirm) => managingFirm)
  .reset($managingFirms);

const setSubscriberStatisticsFilter = createEvent<SubscriberStatisticsForm>();
const $subscriberStatisticsFilter =
  createStore<SubscriberStatisticsForm | null>(null).on(
    setSubscriberStatisticsFilter,
    (_, filter) => filter,
  );

const selectHousingStock = createEvent<number>();
const $selectedHousingStock = createStore<number>(0).on(
  selectHousingStock,
  (_, housingStock) => housingStock,
);

const getStatisticFx = createEffect<
  SubscriberStatisticsFilter,
  SubscriberStatisticsСonsumptionResponse[]
>(fetchSubscribersStatistic);

const getHousingStocksFx = createEffect<string, BuildingListResponsePagedList>(
  fetchHousingStocksByManagingFirm,
);
const $housingStocks = createStore<HousingStockWithApartmentStatistic[]>([])
  .on(getHousingStocksFx.doneData, (_, pagedResponse) => {
    if (!pagedResponse.items) {
      return [];
    }
    const preparedHousingStocks = pagedResponse.items.map((housingStock) => ({
      ...(housingStock as BuildingListResponse & {
        numberOfApartments: number;
      }),
      apartmentsStatistic: [],
    }));
    return preparedHousingStocks;
  })
  .on(
    getStatisticFx.done,
    (
      housingStocks,
      { params: { HousingStockId }, result: apartmentsStatistic },
    ) =>
      housingStocks.map((housingStock) => {
        if (housingStock.id !== HousingStockId) {
          return housingStock;
        }
        return { ...housingStock, apartmentsStatistic };
      }),
  );

const $housingStocksIsLoading = getHousingStocksFx.pending;
const $statisticIsLoading = getStatisticFx.pending;
const $managingFirmsLoading = getManagingFirmsFx.pending;

sample({
  clock: $selectedCity,
  source: StatiscticsPageGate.status,
  filter: (isPageOpen) => isPageOpen,
  fn: (_, selectedCity) => selectedCity,
  target: getManagingFirmsFx,
});

sample({
  source: $selectedCity,
  clock: StatiscticsPageGate.open,
  filter: (city): city is string => Boolean(city),
  target: getManagingFirmsFx,
});

sample({
  clock: $selectedManagingFirm,
  filter: Boolean,
  target: getHousingStocksFx,
});

sample({
  clock: addressSearchService.outputs.$existingCities.map((cities) =>
    _.last(cities),
  ),
  filter: Boolean,
  target: selectCity,
});

sample({
  clock: combine(
    $selectedHousingStock,
    $subscriberStatisticsFilter,
    (HousingStockId, filter) => {
      if (!filter) {
        return { HousingStockId };
      }
      return { ...filter, HousingStockId };
    },
  ),
  filter: (filter) => Boolean(filter.HousingStockId),
  fn: (filter) => prepareFilterBeforeSenging(filter),
  target: getStatisticFx,
});

export const displayStatisticsListByManagingFirmService = {
  inputs: {
    selectCity,
    selectManagingFirm,
    selectHousingStock,
    setSubscriberStatisticsFilter,
  },
  outputs: {
    $managingFirms,
    $cities: addressSearchService.outputs.$existingCities,
    $selectedCity,
    $selectedManagingFirm,
    $selectedHousingStock,
    $housingStocks,
    $housingStocksIsLoading,
    $statisticIsLoading,
    $subscriberStatisticsFilter,
    $managingFirmsLoading,
  },
  gates: {
    StatiscticsPageGate,
  },
};
