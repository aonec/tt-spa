import {
  $existingCities,
  $selectedCity,
  ExistingCitiesGate,
  fetchExistingCities,
  setSelectedCity,
} from './index';
import { forward } from 'effector';
import { getExistingCities } from '../../../../_api/housingStocks';

fetchExistingCities.use(getExistingCities);

$existingCities.on(fetchExistingCities.doneData, (_, cities) => cities);

forward({
  from: ExistingCitiesGate.open,
  to: fetchExistingCities,
});

$selectedCity
  .on(setSelectedCity, (_, city) => city)
  .on(fetchExistingCities.doneData, (_, cities) =>
    cities ? cities[cities.length - 1] : _
  );
