import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  GuidStringDictionaryItem,
  HousingStockListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';
import {
  fetchHousingStocksByManagingFirm,
  fetchManagingFirm,
  fetchSubscribersStatistic,
} from './displayStatisticsListByManagingFirmService.api';
import {
  HousingStockWithApartmentStatistic,
  SubscriberStatisticsFilter,
} from './displayStatisticsListByManagingFirmService.types';
import { SubscriberStatisticsForm } from './view/ManagingFirmSearch/ManagingFirmSearch.types';

const domain = createDomain('displayStatisticsListByManagingFirmService');

const getManagingFirmsFx = domain.createEffect<
  void,
  GuidStringDictionaryItem[]
>(fetchManagingFirm);
const $managingFirms = domain
  .createStore<GuidStringDictionaryItem[]>([])
  .on(getManagingFirmsFx.doneData, (_, managingFirms) => managingFirms);

const selectCity = domain.createEvent<string>();
const $selectedCity = domain
  .createStore<string>('')
  .on(selectCity, (_, city) => city);

const selectManagingFirm = domain.createEvent<string>();
const $selectedManagingFirm = domain
  .createStore<string>('')
  .on(selectManagingFirm, (_, managingFirm) => managingFirm);

const setSubscriberStatisticsFilter = domain.createEvent<SubscriberStatisticsForm>();
const $subscriberStatisticsFilter = domain
  .createStore<SubscriberStatisticsForm | null>(null)
  .on(setSubscriberStatisticsFilter, (_, filter) => filter);

const selectHousingStock = domain.createEvent<number>();
const $selectedHousingStock = domain
  .createStore<number>(0)
  .on(selectHousingStock, (_, housingStock) => housingStock);

const getStatisticFx = domain.createEffect<
  SubscriberStatisticsFilter,
  SubscriberStatisticsСonsumptionResponse[]
>(fetchSubscribersStatistic);

const getHousingStocksFx = domain.createEffect<
  string,
  HousingStockListResponsePagedList
>(fetchHousingStocksByManagingFirm);
const $housingStocks = domain
  .createStore<HousingStockWithApartmentStatistic[]>([])
  .on(getHousingStocksFx.doneData, (_, pagedResponse) => {
    if (!pagedResponse.items) {
      return [];
    }
    const preparedHousingStocks = pagedResponse.items.map((housingStock) => ({
      ...housingStock,
      apartmentsStatistic: [],
    }));
    return preparedHousingStocks;
  })
  .on(
    getStatisticFx.done,
    (
      housingStocks,
      { params: { HousingStockId }, result: apartmentsStatistic }
    ) =>
      housingStocks.map((housingStock) => {
        if (housingStock.id !== HousingStockId) {
          return housingStock;
        }
        return { ...housingStock, apartmentsStatistic };
      })
  );

const StatiscticsPageGate = createGate();

const $housingStocksIsLoading = getHousingStocksFx.pending;
const $statisticIsLoading = getStatisticFx.pending;

sample({
  clock: guard({
    source: $managingFirms,
    clock: StatiscticsPageGate.open,
    filter: (managingFirms) => !Boolean(managingFirms.length),
  }),
  target: getManagingFirmsFx,
});

forward({
  from: $selectedManagingFirm,
  to: getHousingStocksFx,
});

sample({
  source: guard({
    clock: $selectedHousingStock,
    filter: Boolean,
  }),
  clock: combine(
    $selectedHousingStock,
    $subscriberStatisticsFilter,
    (HousingStockId, filter) => {
      if (!filter) {
        return { HousingStockId };
      }
      return { ...filter, HousingStockId };
    }
  ),
  fn: (_, filter) => filter,
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
    $cities: $existingCities,
    $selectedCity,
    $selectedManagingFirm,
    $housingStocks,
    $housingStocksIsLoading,
    $statisticIsLoading,
    $subscriberStatisticsFilter,
  },
  gates: {
    StatiscticsPageGate,
  },
};
