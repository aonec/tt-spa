import { createDomain, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { GetInspectorsHousingStocksRequestParams } from '../displayInspectorsHousingStocksService/types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const searchInspectorsHousingStockServiceDomain = createDomain(
  'searchInspectorsHousingStockService',
);

const $isExtendedSearchOpen =
  searchInspectorsHousingStockServiceDomain.createStore(false);

const extendedSearchOpened =
  searchInspectorsHousingStockServiceDomain.createEvent();
const extendedSearchClosed =
  searchInspectorsHousingStockServiceDomain.createEvent();

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
      init: null as number | null,
    },
  },
});

const clearExtendedSearch =
  searchInspectorsHousingStockServiceDomain.createEvent();

const startSearchInspectorsHousingStocks =
  searchInspectorsHousingStockServiceDomain.createEvent<GetInspectorsHousingStocksRequestParams>();

const applyExtendedFilters =
  searchInspectorsHousingStockServiceDomain.createEvent();

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
  source: searchForm.$values,
  clock: guard({
    source: searchForm.$values,
    clock: searchForm.submit,
    filter: (values) =>
      Boolean(values.HouseManagement || values.InspectorId) ||
      Boolean(values.City && values.Street),
  }),
  fn: (values) => values as GetInspectorsHousingStocksRequestParams,
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
