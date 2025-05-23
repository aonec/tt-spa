import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  getApartments,
  getExistingCities,
  getExistingStreets,
} from './addressSearchService.api';
import {
  ExistingApartmentNumberType,
  GetApartmentsRequest,
  GetExistingSteetRequestParams,
} from './addressSearchService.types';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';
import { ApartmentListResponsePagedList } from 'api/types';

const handleSearchApartNumber = createEvent<AddressSearchValues>();
const handleResetForm = createEvent();

const setWithApartment = createEvent<boolean>();

const fetchExistingCities = createEffect<void, string[] | null>(
  getExistingCities,
);
const successFetchExistingCities = createEvent();

const getApartmentsFx = createEffect<
  GetApartmentsRequest,
  ApartmentListResponsePagedList
>(getApartments);

const $existingCities = createStore<string[] | null>(null).on(
  fetchExistingCities.doneData,
  (_, cities) => cities,
);

const fetchExistingStreets = createEffect<
  GetExistingSteetRequestParams,
  string[]
>(getExistingStreets);
const $existingStreets = createStore<string[]>([]).on(
  fetchExistingStreets.doneData,
  (_, payload) => payload,
);

const $withApartment = createStore<boolean>(false).on(
  setWithApartment,
  (_, data) => data,
);

const $isExistingCitiesLoading = fetchExistingCities.pending;

const $existingApartmentNumbers = createStore<ExistingApartmentNumberType[]>([])
  .on(getApartmentsFx.doneData, (_, { items }) => {
    if (!items) return [];
    return items
      .filter((apartment) => Boolean(apartment.apartmentNumber))
      .map((apartment) => ({ value: apartment.apartmentNumber! }));
  })
  .reset(handleResetForm);

const AddressSearchGate = createGate();
const ExistingCitiesGate = createGate();
const ExistingStreetsGate = createGate<GetExistingSteetRequestParams>();

sample({
  clock: AddressSearchGate.close,
  target: handleResetForm,
});

sample({
  source: { cities: $existingCities, isLoading: $isExistingCitiesLoading },
  clock: ExistingCitiesGate.open,
  filter: ({ cities, isLoading }) => !cities && !isLoading,
  target: fetchExistingCities,
});

sample({
  clock: ExistingStreetsGate.state.map((values) => values),
  filter: (payload) => Boolean(payload.City),
  target: fetchExistingStreets,
});

sample({
  clock: handleSearchApartNumber,
  source: $withApartment,
  filter: (withApartment, values) =>
    Boolean(withApartment && values.city && values.street && values.house),
  fn: (_, values) =>
    ({
      City: values.city,
      Street: values.street,
      HousingStockNumber: values.house,
      Corpus: values.corpus,
    }) as GetApartmentsRequest,
  target: getApartmentsFx,
});

sample({
  clock: fetchExistingCities.doneData,
  target: successFetchExistingCities,
});

export const addressSearchService = {
  outputs: {
    $existingCities,
    $existingStreets,
    $isExistingCitiesLoading,
    $existingApartmentNumbers,
  },
  inputs: {
    handleSearchApartNumber,
    setWithApartment,
    handleResetForm,
    successFetchExistingCities,
  },
  gates: {
    ExistingCitiesGate,
    ExistingStreetsGate,
    AddressSearchGate,
  },
};
