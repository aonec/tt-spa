import {
  $apartmentActsPaged,
  ActJournalGate,
  clearCreationActForms,
  createActForm,
  createApartmentActFx,
  refetchApartmentActs,
} from './index';
import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { addApartmentActs, getApartmentActs } from '01/_api/apartmentActs';
import { combine, forward, sample } from 'effector';
import {
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

$apartmentActsPaged.on(fetchApartmentActsFx.doneData, (_, acts) => acts);


sample({
  source: combine(
    searchForm.$values,
    ActJournalGate.state,
    (formValues, filterSortState) => ({ formValues, filterSortState })
  ),
  clock: [
    searchForm.formValidated,
    refetchApartmentActs,
    ActJournalGate.open,
    ActJournalGate.state,
  ],
  fn: ({ formValues: data, filterSortState }) => ({
    City: data.city,
    Street: data.street,
    HousingStockNumber: data.house,
    ApartmentNumber: data.apartment,
    ...filterSortState,
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

forward({
  from: createApartmentActFx.done,
  to: refetchApartmentActs,
});

forward({
  from: clearCreationActForms,
  to: [createActForm.reset, addressSearchForm.reset],
});
