import {
  clearCreationActForms,
  createActForm,
  createApartmentActFx,
  refetchApartmentActs,
} from './index';
import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { addApartmentActs, getApartmentActs } from '01/_api/apartmentActs';
import { combine, forward, sample, guard } from 'effector';
import {
  $apartmentActs,
  clearCreationActFormValues,
  fetchApartmentActsFx,
  searchForm,
} from '.';
import {
  $existingApartmentNumbers,
  addressSearchForm,
} from '01/features/addressSearch/models';

fetchApartmentActsFx.use(getApartmentActs);

createApartmentActFx.use(addApartmentActs);

$apartmentActs.on(fetchApartmentActsFx.doneData, (_, acts) => acts);

sample({
  source: searchForm.$values,
  clock: [searchForm.formValidated, refetchApartmentActs],
  fn: (data) => ({
    City: data.city,
    Street: data.street,
    HousingStockNumber: data.house,
    ApartmentNumber: data.apartment,
  }),
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
  source: combine(
    createActForm.$values,
    addressSearchForm.$values,
    $existingApartmentNumbers,
    (values, address, apartmentNumbers) => ({
      ...values,
      apartmentId: apartmentNumbers?.find(
        (elem) => elem.number === address.apartment
      )?.id,
    })
  ),
  target: createApartmentActFx as any,
});

guard({
  source: combine(
    searchForm.$values,
    addressSearchForm.$values,
    (searchForm, creationSearchForm) => {
      return (
        searchForm.street === creationSearchForm.street &&
        searchForm.house === creationSearchForm.house &&
        searchForm.apartment === creationSearchForm.apartment
      );
    }
  ),
  clock: createApartmentActFx.done,
  filter: (isSuccess) => isSuccess,
  target: refetchApartmentActs,
});

forward({
  from: clearCreationActForms,
  to: [createActForm.reset, addressSearchForm.reset],
});
