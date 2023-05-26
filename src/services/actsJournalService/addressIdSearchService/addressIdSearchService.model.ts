import { createDomain } from 'effector';
import {
  FindAddressFilter,
  FindApartmentParams,
} from './addressIdSearchService.types';
import { fetchApartmentId } from './addressIdSearchService.api';

const domain = createDomain('addressIdSearchService');

const setAddress = domain.createEvent<FindAddressFilter>();
const $searchAddressFilter = domain
  .createStore<FindAddressFilter>({})
  .on(setAddress, (_, address) => address);

const getApartmentSearchId = domain.createEvent();
const getApartmentSearchIdFx = domain.createEffect<
  FindApartmentParams,
  number | null
>(fetchApartmentId);
const $apartmentSearchId = domain
  .createStore<number | null>(null)
  .on(getApartmentSearchIdFx.doneData, (_, id) => id)
  .reset($searchAddressFilter);

const $isSuccess = $apartmentSearchId.map(Boolean);

const $isError = domain
  .createStore(false)
  .on(getApartmentSearchIdFx.fail, () => true)
  .reset(getApartmentSearchIdFx.doneData, $searchAddressFilter);

const $isLoading = getApartmentSearchIdFx.pending;

export const addressIdSearchService = {
  inputs: {
    getApartmentSearchId,
    getApartmentSearchIdFx,
    setAddress,
  },
  outputs: {
    $apartmentSearchId,
    $searchAddressFilter,
    $isSuccess,
    $isError,
    $isLoading,
  },
};
