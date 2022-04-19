import {
  fetchExistingCities,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { forward } from 'effector';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';

forward({
  from: fetchExistingCities.doneData.map((cities) =>
    cities ? cities[cities.length - 1] : ''
  ),
  to: searchInspectorsHousingStockService.forms.searchForm.fields.City.set,
});
