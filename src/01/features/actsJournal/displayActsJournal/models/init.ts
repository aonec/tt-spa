import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { forward } from 'effector';
import { searchForm } from '.';

forward({
  from: fetchExistingCities.doneData.map(
    (cities) => (cities && cities[cities.length - 1]) || ''
  ),
  to: searchForm.fields.city.set,
});
