import { sample } from 'effector';
import {
  $selectedHousingsStockId,
  setSelectedHousingStockId,
  subscribersConsumptionFindForm,
} from './index';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

$selectedHousingsStockId.on(setSelectedHousingStockId, (_, id) => id);

sample({
  clock: addressSearchService.outputs.$existingCities.updates,
  fn: (cities) => (cities?.length ? cities[cities.length - 1] : ''),
  target: subscribersConsumptionFindForm.fields.city.set,
});
