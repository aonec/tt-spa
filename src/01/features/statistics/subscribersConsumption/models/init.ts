import { $existingCities } from './../../../housingStocks/displayHousingStockCities/models/index';
import { forward, sample } from 'effector';
import {
  $selectedHousingsStockId,
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
} from './index';

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);

sample({
  clock: $existingCities.updates,
  fn: (cities) => (cities?.length ? cities[cities.length - 1] : ''),
  target: subscribersConsumptionFindForm.fields.city.set,
});
