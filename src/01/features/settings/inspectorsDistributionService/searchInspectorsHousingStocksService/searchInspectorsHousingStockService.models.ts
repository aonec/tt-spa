import { createDomain } from 'effector';
import { createForm } from 'effector-forms';

const searchInspectorsHousingStockServiceDomain = createDomain(
  'searchInspectorsHousingStockService'
);

const $isExtendedSearchOpen = searchInspectorsHousingStockServiceDomain.createStore(
  false
);

const extendedSearchOpened = searchInspectorsHousingStockServiceDomain.createEvent();
const extendedSearchClosed = searchInspectorsHousingStockServiceDomain.createEvent();

const searchForm = createForm({
  fields: {
    City: {
      init: '',
    },
    Street: {
      init: '',
    },
    HousingStockNumber: {
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

const clearExtendedSearch = searchInspectorsHousingStockServiceDomain.createEvent();

const startSearchInspectorsHousingStocks = searchInspectorsHousingStockServiceDomain.createEvent();

export const searchInspectorsHousingStockService = {
  forms: {
    searchForm,
  },
  inputs: {
    startSearchInspectorsHousingStocks,
    extendedSearchOpened,
    extendedSearchClosed,
    clearExtendedSearch,
  },
  outputs: { $isExtendedSearchOpen },
};
