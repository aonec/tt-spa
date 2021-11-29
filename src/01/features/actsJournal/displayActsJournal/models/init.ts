import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { getApartmentActs } from '01/_api/apartmentActs';
import { forward, sample } from 'effector';
import { $apartmentActs, fetchApartmentActsFx, searchForm } from '.';

fetchApartmentActsFx.use(getApartmentActs);

$apartmentActs.on(fetchApartmentActsFx.doneData, (_, acts) => acts);

sample({
  source: searchForm.$values,
  clock: searchForm.formValidated,
  target: fetchApartmentActsFx as any,
});

forward({
  from: fetchExistingCities.doneData.map(
    (cities) => (cities && cities[cities.length - 1]) || ''
  ),
  to: searchForm.fields.city.set,
});
