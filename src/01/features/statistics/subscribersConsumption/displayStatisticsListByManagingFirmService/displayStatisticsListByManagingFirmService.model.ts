import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain, forward, guard, sample } from 'effector';
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
import { HousingStockWithApartmentStatistic } from './displayStatisticsListByManagingFirmService.types';

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

const selectHousingStock = domain.createEvent<number>();
const getStatisticFx = domain.createEffect<
  number,
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
    (housingStocks, { params: housingStockId, result: apartmentsStatistic }) =>
      housingStocks.map((housingStock) => {
        if (housingStock.id !== housingStockId) {
          return housingStock;
        }
        return { ...housingStock, apartmentsStatistic };
      })
  );

const StatiscticsPageGate = createGate();

const $housingStocksIsLoading = getHousingStocksFx.pending;

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
  source: selectHousingStock,
  clock: guard({
    source: $housingStocks,
    clock: selectHousingStock,
    filter: (housingStocks, selectedId) => {
      const selectedHousingStock = housingStocks.find(
        (housingStock) => housingStock.id === selectedId
      );
      if (!selectedHousingStock) {
        return false;
      }
      const isStatisticExist =
        selectedHousingStock.apartmentsStatistic.length !== 0;
      if (!isStatisticExist) {
        return true;
      }
      return false;
    },
  }),
  fn: (id) => id,
  target: getStatisticFx,
});

export const displayStatisticsListByManagingFirmService = {
  inputs: {
    selectCity,
    selectManagingFirm,
    selectHousingStock,
  },
  outputs: {
    $managingFirms,
    $cities: $existingCities,
    $selectedCity,
    $selectedManagingFirm,
    $housingStocks,
    $housingStocksIsLoading,
  },
  gates: {
    StatiscticsPageGate,
  },
};
