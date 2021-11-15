import {
  $existingCities,
  ExistingCitiesGate,
  fetchExistingCities,
} from './index';
import { forward } from 'effector';
import { getExistingCities } from '01/_api/housingStocks';

fetchExistingCities.use(getExistingCities);

$existingCities.on(fetchExistingCities.doneData, (_, cities) => cities);

forward({
  from: ExistingCitiesGate.open,
  to: fetchExistingCities,
});
