import { fetchExistingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { forward } from 'effector';
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
