import { createGate } from 'effector-react';
import { getApartments } from './displayApartmentsListService.api';
import { createDomain, sample, guard, forward } from 'effector';
import { ApartmentListResponsePagedList } from 'myApi';
import {
  GetApartmentsListRequestPayload,
  SearchApartmentsPayload,
} from './displayApartmentsListService.types';

const domain = createDomain(
  'displayApartmentsListService'
);

const $apartmentsPagedList = domain.store<ApartmentListResponsePagedList | null>(
  null
);

const $apartmentsList = $apartmentsPagedList.map((data) => data?.items || []);
const $pagedInfo = $apartmentsPagedList.map((data) => ({
  pageNumber: data?.pageNumber,
  totalItems: data?.totalItems,
  pageSize: data?.pageSize,
}));

const fetchApartmentsFx = domain.createEffect<
  GetApartmentsListRequestPayload,
  ApartmentListResponsePagedList
>(getApartments);

const searchApartments = domain.createEvent<SearchApartmentsPayload>();

const $searchApartmentsPayload = domain.createStore<SearchApartmentsPayload | null>(
  null
);

const $isLoading = fetchApartmentsFx.pending;

const setPageNumber = domain.createEvent<number>();

const clearSearchPayload = domain.createEvent();

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
  .on(fetchApartmentsFx.doneData, (_, data) => data)
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
  target: fetchApartmentsFx,
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
