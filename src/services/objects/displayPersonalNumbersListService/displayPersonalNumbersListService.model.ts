import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponse, ApartmentListResponsePagedList } from 'myApi';
import { GetApartmentsListRequestPayload } from '../displayApartmentsListService/displayApartmentsListService.types';
import { getApartments } from './displayPersonalNumbersListService.api';

const domain = createDomain('displayPersonalNumbersListService');

const $apartments = domain.createStore<ApartmentListResponse[]>([]);
const clearApartments = domain.createEvent();

const searchPersonalNumbers = domain.createEvent<GetApartmentsListRequestPayload>();
const getApartmentsListByPersonalNumber = domain.createEffect<
  GetApartmentsListRequestPayload,
  ApartmentListResponsePagedList
>(getApartments);

const $isLoading = getApartmentsListByPersonalNumber.pending;

const SearchPersonalNumberGate = createGate();

$apartments
  .on(
    getApartmentsListByPersonalNumber.doneData,
    (_, apartmentsResponse) => apartmentsResponse.items || []
  )
  .reset(clearApartments);

forward({
  from: searchPersonalNumbers,
  to: getApartmentsListByPersonalNumber,
});

forward({
  from: SearchPersonalNumberGate.close,
  to: clearApartments,
});

export const displayPersonalNumbersListService = {
  inputs: {
    searchPersonalNumbers,
  },
  outputs: {
    $apartments,
    $cities: $existingCities,
    $isLoading,
  },
  gates: {
    SearchPersonalNumberGate,
  },
};
