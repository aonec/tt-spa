import {
  $actJournalPageNumber,
  $apartmentActsPaged,
  $selectedActType,
  $selectedResourceType,
  ActJournalGate,
  clearCreationActForms,
  clearFilters,
  createApartmentAct,
  createApartmentActFx,
  expandedFilterForm,
  refetchApartmentActs,
  setActJournalPageNumber,
} from './index';
import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { addApartmentActs, getApartmentActs } from '01/_api/apartmentActs';
import { combine, forward, guard, sample } from 'effector';
import {
  fetchApartmentActsFx,
  searchForm,
} from '.';
import { addressSearchForm } from '01/features/addressIdSearch/models';
import moment from 'moment';
import { $apartmentSearchId } from '01/features/addressIdSearch/models';

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

sample({
  source: guard({
    source: $apartmentSearchId,
    filter: Boolean,
  }),
  clock: createApartmentAct,
  fn: (apartmentId, formValues) => ({
    ...formValues,
    apartmentId,
    actJobDate: moment(formValues.actJobDate).format('YYYY-MM-DD'),
  }),
  target: createApartmentActFx,
});

forward({
  from: createApartmentActFx.done,
  to: refetchApartmentActs,
});

forward({
  from: clearCreationActForms,
  to: addressSearchForm.reset,
});

forward({
  from: createApartmentActFx.done,
  to: addressSearchForm.reset,
});
