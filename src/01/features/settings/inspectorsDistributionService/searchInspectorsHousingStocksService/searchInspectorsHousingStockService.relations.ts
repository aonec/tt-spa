import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { forward, sample, guard } from 'effector';
import { GetInspectorsHousingStocksRequestParams } from '../displayInspectorsHousingStocksService/types';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';

forward({
  from: fetchExistingCities.doneData.map((cities) =>
    cities ? cities[cities.length - 1] : ''
  ),
  to: searchInspectorsHousingStockService.forms.searchForm.fields.City.set,
});

searchInspectorsHousingStockService.outputs.$isExtendedSearchOpen
  .on(
    searchInspectorsHousingStockService.inputs.extendedSearchOpened,
    () => true
  )
  .reset(searchInspectorsHousingStockService.inputs.extendedSearchClosed);

forward({
  from: searchInspectorsHousingStockService.inputs.clearExtendedSearch,
  to: [
    searchInspectorsHousingStockService.forms.searchForm.fields.HouseManagement
      .resetValue,
    searchInspectorsHousingStockService.forms.searchForm.fields.InspectorId
      .resetValue,
  ],
});

forward({
  from: searchInspectorsHousingStockService.inputs.applyExtendedFilters,
  to: [
    searchInspectorsHousingStockService.forms.searchForm.submit,
    searchInspectorsHousingStockService.inputs.extendedSearchClosed,
  ],
});

sample({
  source: searchInspectorsHousingStockService.forms.searchForm.$values,
  clock: guard({
    source: searchInspectorsHousingStockService.forms.searchForm.$values,
    clock: searchInspectorsHousingStockService.forms.searchForm.submit,
    filter: (values) => Boolean(values.City && values.Street),
  }),
  fn: (values) => values as GetInspectorsHousingStocksRequestParams,
  target:
    searchInspectorsHousingStockService.inputs
      .startSearchInspectorsHousingStocks,
});
