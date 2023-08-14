import { createGate } from 'effector-react';
import { createDomain, forward, sample } from 'effector';
import { BuildingListResponsePagedList } from 'api/types';
import {
  GetHousingStocksRequestPayload,
  SearchHousingStocksPayload,
} from './displayObjectsListService.types';
import { getBuildings } from './displayObjectsListService.api';

const domain = createDomain('displayObjectsListService');

const $housingStocks = domain.createStore<BuildingListResponsePagedList | null>(
  null,
);

const fetchHousingStocksFx = domain.createEffect<
  GetHousingStocksRequestPayload,
  BuildingListResponsePagedList
>(getBuildings);

const $isLoading = fetchHousingStocksFx.pending;

const $searchPayload = domain.createStore<SearchHousingStocksPayload | null>(
  null,
);

const searchHosuingStocks = domain.createEvent<SearchHousingStocksPayload>();

const setPageNumber = domain.createEvent<number>();

const clearSearchState = domain.createEvent();

const HousingStocksGate = createGate();

forward({
  from: HousingStocksGate.close,
  to: clearSearchState,
});

$housingStocks
  .on(fetchHousingStocksFx.doneData, (_, result) => result)
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
  target: fetchHousingStocksFx,
});

sample({
  clock: [HousingStocksGate.open],
  fn: () => ({ PageSize: 30 }),
  target: fetchHousingStocksFx,
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
