import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { getApartmentsQuery } from './displayApartmentsListService.api';
import { sample, guard, forward } from 'effector';
import { ApartmentListResponsePagedList } from 'api/types';
import { SearchApartmentsPayload } from './displayApartmentsListService.types';

const $apartmentsPagedList = createStore<ApartmentListResponsePagedList | null>(
  null,
);

const $apartmentsList = $apartmentsPagedList.map((data) => data?.items || []);
const $pagedInfo = $apartmentsPagedList.map((data) => ({
  pageNumber: data?.pageNumber,
  totalItems: data?.totalItems,
  pageSize: data?.pageSize,
}));

const searchApartments = createEvent<SearchApartmentsPayload>();

const $searchApartmentsPayload = createStore<SearchApartmentsPayload | null>(
  null,
);

const $isLoading = getApartmentsQuery.$pending;

const setPageNumber = createEvent<number>();

const clearSearchPayload = createEvent();

const ApartmentsListGate = createGate();

forward({
  from: ApartmentsListGate.close,
  to: clearSearchPayload,
});

$searchApartmentsPayload
  .on(searchApartments, (state, payload) => ({
    ...(state || {}),
    ...payload,
    pageNumber: 1,
  }))
  .on(setPageNumber, (state, pageNumber) => ({ ...state, pageNumber }))
  .reset(clearSearchPayload);

$apartmentsPagedList
  .on(getApartmentsQuery.$data, (_, data) => data)
  .reset(clearSearchPayload);

sample({
  clock: guard({
    clock: $searchApartmentsPayload,
    filter: Boolean,
  }),
  fn: (payload) => {
    return {
      City: payload.city,
      Street: payload.street,
      HousingStockNumber: payload.house,
      Corpus: payload.corpus,
      ApartmentNumber: payload.apartment,
      PageNumber: payload.pageNumber,
      PageSize: 30,
    };
  },
  target: getApartmentsQuery.start,
});

sample({
  clock: ApartmentsListGate.close,
  target: getApartmentsQuery.reset,
});

export const displayApartmentsListService = {
  inputs: {
    searchApartments,
    setPageNumber,
  },
  outputs: {
    $apartmentsList,
    $pagedInfo,
    $isLoading,
  },
  gates: {
    ApartmentsListGate,
  },
};
