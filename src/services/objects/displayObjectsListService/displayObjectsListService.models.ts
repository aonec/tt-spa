import { createGate } from 'effector-react';
import { createDomain, guard, sample } from 'effector';
import { HousingStockListResponsePagedList } from 'myApi';
import { getHosuingStocks } from './displayObjectsListService.api';
import {
  GetHousingStocksRequestPayload,
  SearchHousingStocksPayload,
} from './displayObjectsListService.types';

const displayObjectsListServiceDomain = createDomain(
  'displayObjectsListService'
);

const $housingStocks = displayObjectsListServiceDomain.createStore<HousingStockListResponsePagedList | null>(
  null
);

const fetchHousingStocksFx = displayObjectsListServiceDomain.createEffect<
  GetHousingStocksRequestPayload,
  HousingStockListResponsePagedList
>(getHosuingStocks);

const $isLoading = fetchHousingStocksFx.pending;

const $searchPayload = displayObjectsListServiceDomain.createStore<SearchHousingStocksPayload | null>(
  null
);

const searchHosuingStocks = displayObjectsListServiceDomain.createEvent<SearchHousingStocksPayload>();

const setPageNumber = displayObjectsListServiceDomain.createEvent<number>();

const clearSearchState = displayObjectsListServiceDomain.createEvent();

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
  clock: guard({ clock: $searchPayload, filter: Boolean }),
  fn: (payload) => {
    return {
      City: payload?.city,
      Street: payload?.street,
      HousingStockNumber: payload?.house,
      Corpus: payload?.corpus,
      PageSize: 30,
      PageNumber: payload?.pageNumber,
    };
  },
  target: fetchHousingStocksFx,
});

export const displayObjectsListService = {
  inputs: {
    searchHosuingStocks,
    setPageNumber,
    clearSearchState,
  },
  outputs: {
    $housingStocks,
    $isLoading,
  },
};
