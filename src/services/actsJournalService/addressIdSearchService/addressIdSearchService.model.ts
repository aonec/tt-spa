import { createEffect, createEvent, createStore } from 'effector';

import {
  FindAddressFilter,
  FindApartmentParams,
} from './addressIdSearchService.types';
import { fetchApartmentId } from './addressIdSearchService.api';

const resetAddress = createEvent();

const setAddress = createEvent<FindAddressFilter>();
const $searchAddressFilter = createStore<FindAddressFilter>({})
  .on(setAddress, (_, address) => address)
  .reset(resetAddress);

const getApartmentSearchId = createEvent();
const getApartmentSearchIdFx = createEffect<FindApartmentParams, number | null>(
  fetchApartmentId,
);
const $apartmentSearchId = createStore<number | null>(null)
  .on(getApartmentSearchIdFx.doneData, (_, id) => id)
  .reset([$searchAddressFilter, resetAddress]);

const $isSuccess = $apartmentSearchId.map(Boolean);

const $isError = createStore(false)
  .on(getApartmentSearchIdFx.fail, () => true)
  .reset(getApartmentSearchIdFx.doneData, $searchAddressFilter);

const $isLoading = getApartmentSearchIdFx.pending;

export const addressIdSearchService = {
  inputs: {
    getApartmentSearchId,
    getApartmentSearchIdFx,
    setAddress,
    resetAddress,
  },
  outputs: {
    $apartmentSearchId,
    $searchAddressFilter,
    $isSuccess,
    $isError,
    $isLoading,
  },
};
