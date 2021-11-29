import { createActForm, createApartmentActFx } from './index';
import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { addApartmentActs, getApartmentActs } from '01/_api/apartmentActs';
import { forward, sample } from 'effector';
import {
  $apartmentActs,
  clearCreationActFormValues,
  fetchApartmentActsFx,
  searchForm,
} from '.';
import { addressSearchForm } from '01/features/addressSearch/models';

fetchApartmentActsFx.use(getApartmentActs);

createApartmentActFx.use(addApartmentActs)

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

forward({
  from: clearCreationActFormValues,
  to: [createActForm.reset, addressSearchForm.reset],
});

sample({
  clock: createActForm.formValidated,
  source: createActForm.$values,
  target: createApartmentActFx as any,
});
