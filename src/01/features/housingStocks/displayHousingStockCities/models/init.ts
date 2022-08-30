import {
  $existingCities,
  $selectedCity,
  ExistingCitiesGate,
  fetchExistingCities,
  setSelectedCity,
} from './index';
import { forward, guard, sample } from 'effector';
import { getExistingCities } from '01/_api/housingStocks';

fetchExistingCities.use(getExistingCities);

$existingCities.on(fetchExistingCities.doneData, (_, cities) => cities);

$selectedCity
  .on(setSelectedCity, (_, city) => city)
  .on(fetchExistingCities.doneData, (_, cities) =>
    cities ? cities[cities.length - 1] : _
  );

sample({
  clock: guard({
    source: $existingCities,
    clock: ExistingCitiesGate.open,
    filter: (source) => !source,
  }),
  target: fetchExistingCities,
});
