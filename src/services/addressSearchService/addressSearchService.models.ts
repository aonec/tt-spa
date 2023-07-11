import {
  getExistingCities,
  getExistingStreets,
} from './addressSearchService.api';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetExistingSteetRequestParams } from './addressSearchService.types';

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

const ExistingCitiesGate = createGate();
const ExistingStreetsGate = createGate<GetExistingSteetRequestParams>();

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

export const addressSearchService = {
  outputs: {
    $existingCities,
    $existingStreets,
  },
  gates: {
    ExistingCitiesGate,
    ExistingStreetsGate,
  },
};
