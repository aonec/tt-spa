import {
  getExistingCities,
  getExistingStreets,
} from './addressSearchService.api';
import { createDomain, sample } from 'effector';
import { isEqual } from 'lodash';
import { createGate } from 'effector-react';
import { GetExistingSteetRequestParams } from './addressSearchService.types';
import { createForm } from 'effector-forms';
import { AddressSearchValues } from './view/AddressSearch/AddressSearch.types';

const domain = createDomain('addressSearchService');

const fetchExistingCities = domain.createEffect<void, string[] | null>(
  getExistingCities,
);
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

const setInitialValues =
  domain.createEvent<Partial<AddressSearchValues> | null>();

const $verifiedInitialValues = domain
  .createStore<Partial<AddressSearchValues> | null>(null)
  .on(setInitialValues, (prev, income) => {
    const isInitialValuesRealyChange = !isEqual(prev, income);
    if (isInitialValuesRealyChange) {
      return income;
    } else {
      return prev;
    }
  });

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

const $isExistingCitiesLoading = fetchExistingStreets.pending;

export const addressSearchService = {
  outputs: {
    $existingCities,
    $existingStreets,
    $isExistingCitiesLoading,
    $verifiedInitialValues,
  },
  inputs: { setInitialValues },
  gates: {
    ExistingCitiesGate,
    ExistingStreetsGate,
    AddressSearchGate,
  },
  forms: {
    addressSearchForm,
  },
};
