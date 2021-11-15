import {
  $existingCities,
  ExistingCitiesGate,
  fetchExistingCities,
} from './index';
import { forward, guard } from 'effector';
import { getExistingCities } from '01/_api/housingStocks';

fetchExistingCities.use(getExistingCities);

$existingCities.on(fetchExistingCities.doneData, (_, cities) => cities);

forward({
  from: guard({
    clock: ExistingCitiesGate.open,
    source: $existingCities,
    filter: (cities) => !cities,
  }),
  to: fetchExistingCities,
});
