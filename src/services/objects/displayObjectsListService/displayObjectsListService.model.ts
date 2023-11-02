import { createEvent, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { BuildingListResponsePagedList } from 'api/types';
import { SearchHousingStocksPayload } from './displayObjectsListService.types';
import { getBuildingsQuery } from './displayObjectsListService.api';
import { deleteObjectService } from '../deleteObjectService';

const $housingStocks = createStore<BuildingListResponsePagedList | null>(null);

const $isLoading = getBuildingsQuery.$pending;

const $searchPayload = createStore<SearchHousingStocksPayload | null>(null);

const searchHosuingStocks = createEvent<SearchHousingStocksPayload>();

const setPageNumber = createEvent<number>();

const clearSearchState = createEvent();

const refetchBuildings = createEvent();

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
  source: $searchPayload,
  clock: [$searchPayload, refetchBuildings],
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

sample({
  clock: deleteObjectService.inputs.buildingDeleted,
  target: refetchBuildings,
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
