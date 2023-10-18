import { createEffect, createEvent, createStore } from 'effector';
import { forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponsePagedList } from 'api/types';
import { GetApartmentsListRequestPayload } from '../displayApartmentsListService/displayApartmentsListService.types';
import { getApartments } from './displayPersonalNumbersListService.api';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const $apartmentsListPage = createStore<ApartmentListResponsePagedList | null>(
  null,
);
const $apartments = $apartmentsListPage.map(
  (apartmentsResponse) => apartmentsResponse?.items || [],
);
const $filters = createStore<GetApartmentsListRequestPayload | null>(null);

const setPageNumber = createEvent<number>();
const searchPersonalNumbers = createEvent<GetApartmentsListRequestPayload>();
const getApartmentsListByPersonalNumber = createEffect<
  GetApartmentsListRequestPayload,
  ApartmentListResponsePagedList
>(getApartments);

const $isLoading = getApartmentsListByPersonalNumber.pending;

const clearStores = createEvent();

const SearchPersonalNumberGate = createGate();

$apartmentsListPage
  .on(
    getApartmentsListByPersonalNumber.doneData,
    (_, apartmentsResponse) => apartmentsResponse || [],
  )
  .reset(clearStores);

$filters
  .on(searchPersonalNumbers, (_, formFilter) => ({
    ...formFilter,
    PageNumber: 1,
  }))
  .on(setPageNumber, (oldFilters, PageNumber) => ({
    ...oldFilters,
    PageNumber,
  }))
  .reset(clearStores);

sample({
  clock: guard({
    clock: $filters,
    filter: Boolean,
  }),
  target: getApartmentsListByPersonalNumber,
});

forward({
  from: SearchPersonalNumberGate.close,
  to: clearStores,
});

export const displayPersonalNumbersListService = {
  inputs: {
    searchPersonalNumbers,
    setPageNumber,
  },
  outputs: {
    $apartments,
    $cities: addressSearchService.outputs.$existingCities,
    $isLoading,
    $apartmentsListPage,
  },
  gates: {
    SearchPersonalNumberGate,
  },
};
