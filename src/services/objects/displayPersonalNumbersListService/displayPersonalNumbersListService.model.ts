import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponsePagedList } from 'myApi';
import { GetApartmentsListRequestPayload } from '../displayApartmentsListService/displayApartmentsListService.types';
import { getApartments } from './displayPersonalNumbersListService.api';

const domain = createDomain('displayPersonalNumbersListService');

const $apartmentsListPage = domain.createStore<ApartmentListResponsePagedList | null>(
  null
);
const $apartments = $apartmentsListPage.map(
  (apartmentsResponse) => apartmentsResponse?.items || []
);
const $filters = domain.createStore<GetApartmentsListRequestPayload | null>(
  null
);

const setPageNumber = domain.createEvent<number>();
const searchPersonalNumbers = domain.createEvent<GetApartmentsListRequestPayload>();
const getApartmentsListByPersonalNumber = domain.createEffect<
  GetApartmentsListRequestPayload,
  ApartmentListResponsePagedList
>(getApartments);

const $isLoading = getApartmentsListByPersonalNumber.pending;

const clearStores = domain.createEvent();

const SearchPersonalNumberGate = createGate();

$apartmentsListPage
  .on(
    getApartmentsListByPersonalNumber.doneData,
    (_, apartmentsResponse) => apartmentsResponse || []
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
    $cities: $existingCities,
    $isLoading,
    $apartmentsListPage,
  },
  gates: {
    SearchPersonalNumberGate,
  },
};
