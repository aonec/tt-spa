import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { forward, sample } from 'effector';
import { BuildingListResponsePagedList } from 'api/types';
import { SearchHousingStocksPayload } from './displayObjectsListService.types';
import { getBuildingsQuery } from './displayObjectsListService.api';

const $housingStocks = createStore<BuildingListResponsePagedList | null>(null);

const $isLoading = getBuildingsQuery.$pending;

const $searchPayload = createStore<SearchHousingStocksPayload | null>(null);

const searchHosuingStocks = createEvent<SearchHousingStocksPayload>();

const setPageNumber = createEvent<number>();

const clearSearchState = createEvent();

const HousingStocksGate = createGate();

forward({
  from: HousingStocksGate.close,
  to: clearSearchState,
});

$housingStocks
  .on(getBuildingsQuery.$data, (_, result) => result)
  .reset(clearSearchState);

$searchPayload
  .on(searchHosuingStocks, (state, payload) => ({
    ...(state || {}),
    ...payload,
    pageNumber: 1,
  }))
  .on(setPageNumber, (state, pageNumber) => ({ ...state, pageNumber }))
  .reset(clearSearchState);

sample({
  clock: $searchPayload,
  filter: (searchPayload) => Boolean(searchPayload),
  fn: (payload) => {
    return {
      City: payload?.city,
      Street: payload?.street,
      BuildingNumber: payload?.house,
      Corpus: payload?.corpus,
      PageSize: 30,
      PageNumber: payload?.pageNumber,
    };
  },
  target: getBuildingsQuery.start,
});

sample({
  clock: [HousingStocksGate.open],
  fn: () => ({ PageSize: 30 }),
  target: getBuildingsQuery.start,
});

sample({
  clock: HousingStocksGate.close,
  target: getBuildingsQuery.reset,
});

export const displayObjectsListService = {
  inputs: {
    searchHosuingStocks,
    setPageNumber,
  },
  outputs: {
    $housingStocks,
    $isLoading,
  },
  gates: {
    HousingStocksGate,
  },
};
