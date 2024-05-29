import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createForm } from 'effector-forms';
import { GetInspectorsHousingStocksRequestParams } from '../displayInspectorsHousingStocksService/types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const $isExtendedSearchOpen = createStore(false);

const extendedSearchOpened = createEvent();
const extendedSearchClosed = createEvent();

const searchForm = createForm({
  fields: {
    City: {
      init: '',
    },
    Street: {
      init: '',
    },
    BuildingNumber: {
      init: '',
    },
    HouseManagement: {
      init: '',
    },
    InspectorId: {
      init: '',
    },
  },
});

const clearExtendedSearch = createEvent();

const startSearchInspectorsHousingStocks =
  createEvent<GetInspectorsHousingStocksRequestParams>();

const applyExtendedFilters = createEvent();

sample({
  clock: addressSearchService.outputs.$existingCities.map((cities) =>
    cities ? cities[cities.length - 1] : '',
  ),
  target: searchForm.fields.City.set,
});

$isExtendedSearchOpen
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

sample({
  clock: clearExtendedSearch,
  target: [
    searchForm.fields.HouseManagement.resetValue,
    searchForm.fields.InspectorId.resetValue,
  ],
});

sample({
  clock: applyExtendedFilters,
  target: [searchForm.submit, extendedSearchClosed],
});

sample({
  clock: searchForm.submit,
  source: searchForm.$values,
  filter: (values) => {
    console.log('d');
    return (
      Boolean(values.HouseManagement || values.InspectorId) ||
      Boolean(values.City && values.Street)
    );
  },
  fn: (values) => {
    console.log('f');
    return values;
  },
  target: startSearchInspectorsHousingStocks,
});

export const searchInspectorsHousingStockService = {
  forms: {
    searchForm,
  },
  inputs: {
    startSearchInspectorsHousingStocks,
    extendedSearchOpened,
    extendedSearchClosed,
    clearExtendedSearch,
    applyExtendedFilters,
  },
  outputs: { $isExtendedSearchOpen },
};
