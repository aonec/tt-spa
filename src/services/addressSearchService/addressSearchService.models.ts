import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { isEqual } from 'lodash';
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

const handleSearchApartNumber = createEvent();
const handleResetForm = createEvent();

const setWithApartment = createEvent<boolean>();

const fetchExistingCities = createEffect<void, string[] | null>(
  getExistingCities,
);

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

const setInitialValues = createEvent<Partial<AddressSearchValues> | null>();

const $verifiedInitialValues = createStore<Partial<AddressSearchValues> | null>(
  null,
).on(setInitialValues, (prev, income) => {
  const isInitialValuesRealyChange = !isEqual(prev, income);
  if (isInitialValuesRealyChange) {
    return income;
  } else {
    return prev;
  }
});
const $withApartment = createStore<boolean>(false).on(
  setWithApartment,
  (_, data) => data,
);

const $isExistingCitiesLoading = fetchExistingCities.pending;

const addressSearchForm = createForm<AddressSearchValues>({
  fields: {
    city: {
      init: '' as string,
    },
    street: {
      init: '' as string,
    },
    house: {
      init: '' as string,
    },
    corpus: {
      init: '' as string,
    },
    apartment: {
      init: '' as string,
    },
    question: {
      init: '' as string,
    },
  },
});

const $existingApartmentNumbers = createStore<ExistingApartmentNumberType[]>([])
  .on(getApartmentsFx.doneData, (_, { items }) => {
    if (!items) return [];
    return items
      .filter((apartment) => Boolean(apartment.apartmentNumber))
      .map((apartment) => ({ value: apartment.apartmentNumber! }));
  })
  .reset(addressSearchForm.reset);

const AddressSearchGate = createGate();
const ExistingCitiesGate = createGate();
const ExistingStreetsGate = createGate<GetExistingSteetRequestParams>();

sample({
  clock: AddressSearchGate.close,
  target: addressSearchForm.reset,
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
  source: {
    values: addressSearchForm.$values,
    withApartment: $withApartment,
  },
  filter: ({ withApartment, values }) =>
    Boolean(withApartment && values.city && values.street && values.house),
  fn: ({ values }) =>
    ({
      City: values.city,
      Street: values.street,
      HousingStockNumber: values.house,
      Corpus: values.corpus,
    } as GetApartmentsRequest),
  target: getApartmentsFx,
});

sample({ clock: handleResetForm, target: addressSearchForm.reset });

export const addressSearchService = {
  outputs: {
    $existingCities,
    $existingStreets,
    $isExistingCitiesLoading,
    $existingApartmentNumbers,
    $verifiedInitialValues,
  },
  inputs: {
    handleSearchApartNumber,
    setWithApartment,
    handleResetForm,
    setInitialValues,
  },
  gates: {
    ExistingCitiesGate,
    ExistingStreetsGate,
    AddressSearchGate,
  },
  forms: {
    addressSearchForm,
  },
};
