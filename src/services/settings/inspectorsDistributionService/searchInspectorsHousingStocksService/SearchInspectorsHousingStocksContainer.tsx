import { useForm } from 'effector-forms';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';
import { SearchInspectorsHousingStocks } from './views/SearchInspectorsHousingStocks';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { displayHousingStockFiltersService } from '../displayHosuingStockFiltersService/displayHosuingStockFiltersService.models';

const { gates, outputs } = addressSearchService;
const { ExistingCitiesGate, ExistingStreetsGate } = gates;
const { InspectorsGate } = displayInspectorsService.inputs;
const { HousingStockFiltersGate } = displayHousingStockFiltersService.inputs;

export const SearchInspectorsHousingStocksContainer = () => {
  const form = useForm(searchInspectorsHousingStockService.forms.searchForm);

  const cities = useStore(outputs.$existingCities);
  const existingStreets = useStore(outputs.$existingStreets);
  const isExtendedSearchOpen = useStore(
    searchInspectorsHousingStockService.outputs.$isExtendedSearchOpen,
  );
  const inspectors = useStore(displayInspectorsService.outputs.$inspectorsList);
  const housingManagementList = useStore(
    displayHousingStockFiltersService.outputs.$hosuingManagementList,
  );

  const handelExtendedSearchOpen = useEvent(
    searchInspectorsHousingStockService.inputs.extendedSearchOpened,
  );
  const handleExtendedSearchClose = useEvent(
    searchInspectorsHousingStockService.inputs.extendedSearchClosed,
  );
  const handleStartSearch = useEvent(
    searchInspectorsHousingStockService.forms.searchForm.submit,
  );
  const handleClearExtendedSearchValues = useEvent(
    searchInspectorsHousingStockService.inputs.clearExtendedSearch,
  );
  const handleApplyFilters = useEvent(
    searchInspectorsHousingStockService.inputs.applyExtendedFilters,
  );

  return (
    <>
      <InspectorsGate />
      <HousingStockFiltersGate />
      <ExistingCitiesGate />
      <ExistingStreetsGate City={form.fields.City.value} />
      <SearchInspectorsHousingStocks
        handleApplyFilters={() => handleApplyFilters()}
        handleSearch={() => handleStartSearch()}
        handelExtendedSearchOpen={() => handelExtendedSearchOpen()}
        handleExtendedSearchClose={() => handleExtendedSearchClose()}
        handleClearExtendedSearchValues={() =>
          handleClearExtendedSearchValues()
        }
        isExtendedSearchOpen={isExtendedSearchOpen}
        form={form}
        cities={cities}
        existingStreets={existingStreets}
        inspectors={inspectors}
        hosuingManagements={housingManagementList}
      />
    </>
  );
};
