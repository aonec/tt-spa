import {
  getApartments,
  getExistingCities,
  getExistingStreets,
} from './addressSearchService.api';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import {
  ExistingApartmentNumberType,
  GetApartmentsRequest,
  GetExistingSteetRequestParams,
} from './addressSearchService.types';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';
import { ApartmentListResponsePagedList } from 'api/types';

const domain = createDomain('addressSearchService');

const handleSearchApartNumber = domain.createEvent();
const handleResetForm = domain.createEvent();

const setWithApartment = domain.createEvent<boolean>();

const fetchExistingCities = domain.createEffect<void, string[] | null>(
  getExistingCities,
);

const getApartmentsFx = domain.createEffect<
  GetApartmentsRequest,
  ApartmentListResponsePagedList
>(getApartments);

const $existingCities = domain
  .createStore<string[] | null>(null)
  .on(fetchExistingCities.doneData, (_, cities) => cities);

const fetchExistingStreets = domain.createEffect<
  GetExistingSteetRequestParams,
  string[]
>(getExistingStreets);
const $existingStreets = domain
  .createStore<string[]>([])
  .on(fetchExistingStreets.doneData, (_, payload) => payload);

const $withApartment = domain
  .store<boolean>(false)
  .on(setWithApartment, (_, data) => data);

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

const $existingApartmentNumbers = domain
  .createStore<ExistingApartmentNumberType[]>([])
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
  source: $existingCities,
  clock: ExistingCitiesGate.open,
  filter: (cities) => !cities,
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

const $isExistingCitiesLoading = fetchExistingStreets.pending;

export const addressSearchService = {
  outputs: {
    $existingCities,
    $existingStreets,
    $isExistingCitiesLoading,
    $existingApartmentNumbers,
  },
  inputs: { handleSearchApartNumber, setWithApartment, handleResetForm },
  gates: {
    ExistingCitiesGate,
    ExistingStreetsGate,
    AddressSearchGate,
  },
  forms: {
    addressSearchForm,
  },
};
