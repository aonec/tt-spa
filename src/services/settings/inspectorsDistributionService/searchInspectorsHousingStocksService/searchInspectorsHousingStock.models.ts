import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { GetInspectorsHousingStocksRequestParams } from '../displayInspectorsHousingStocksService/types';
import { FormType } from './searchInspectorsHousingStocks.types';

const $isExtendedSearchOpen = createStore(false);

const extendedSearchOpened = createEvent();
const extendedSearchClosed = createEvent();

const handleSearchInspector = createEvent();
const setForm = createEvent<FormType>();

const clearExtendedSearch = createEvent();

const startSearchInspectorsHousingStocks =
  createEvent<GetInspectorsHousingStocksRequestParams>();

const applyExtendedFilters = createEvent();

const $formData = createStore<FormType>({
  City: '',
  Street: '',
  BuildingNumber: '',
  HouseManagement: '',
  InspectorId: '',
}).on(setForm, (_, form) => form);

$isExtendedSearchOpen
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

sample({
  clock: applyExtendedFilters,
  target: extendedSearchClosed,
});

sample({
  clock: handleSearchInspector,
  source: $formData,
  filter: (values) => {
    return (
      Boolean(values.HouseManagement || values.InspectorId) ||
      Boolean(values.City && values.Street)
    );
  },
  fn: (values) => values,
  target: startSearchInspectorsHousingStocks,
});

export const searchInspectorsHousingStockService = {
  inputs: {
    startSearchInspectorsHousingStocks,
    extendedSearchOpened,
    extendedSearchClosed,
    clearExtendedSearch,
    applyExtendedFilters,
    handleSearchInspector,
    setForm,
  },
  outputs: { $isExtendedSearchOpen },
};
