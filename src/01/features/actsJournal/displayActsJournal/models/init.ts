import {
  $actJournalPageNumber,
  $apartmentActsPaged,
  ActJournalGate,
  clearCreationActForms,
  clearFilters,
  createActForm,
  createApartmentActFx,
  expandedFilterForm,
  refetchApartmentActs,
  setActJournalPageNumber,
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
import moment from 'moment';

fetchApartmentActsFx.use(getApartmentActs);

createApartmentActFx.use(addApartmentActs);

$apartmentActsPaged.on(fetchApartmentActsFx.doneData, (_, acts) => acts);

$actJournalPageNumber.on(setActJournalPageNumber, (_, value) => value);

$actJournalPageNumber.reset([searchForm.$values, expandedFilterForm.$values]);

forward({
  from: clearFilters,
  to: [expandedFilterForm.resetValues, searchForm.resetValues],
});

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
  fn: ({ formValues: data, filterSortState }) => {
    const requestPayload = {
      City: data.city,
      Street: data.street,
      HousingStockNumber: data.house,
      ApartmentNumber: data.apartment,
      ...filterSortState,
      ActTypes: filterSortState.ActTypes?.length
        ? filterSortState.ActTypes
        : null,
      ActResourceTypes: filterSortState.ActResourceTypes?.length
        ? filterSortState.ActResourceTypes
        : null,
    };

    return requestPayload;
  },

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
      actJobDate: moment(values.actJobDate).format('YYYY-MM-DD'),
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
