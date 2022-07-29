import { useForm } from 'effector-forms/dist';
import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';
import { SearchInspectorsHousingStocks } from './views/SearchInspectorsHousingStocks';
import { $existingStreets, ExistingStreetsGate } from '../../../housingStocks/displayHousingStockStreets/model';
import { $existingCities, ExistingCitiesGate } from '../../../housingStocks/displayHousingStockCities/models';
import { displayHousingStockFiltersService } from '../../../housingStocks/displayHosuingStockFiltersService/displayHosuingStockFiltersService.models';
import { displayInspectorsService } from '../../../Inspectors/displayInspectors/displayInspectorsService.models';

export const SearchInspectorsHousingStocksContainer = () => {
  const form = useForm(searchInspectorsHousingStockService.forms.searchForm);

  const cities = useStore($existingCities);
  const existingStreets = useStore($existingStreets);
  const isExtendedSearchOpen = useStore(
    searchInspectorsHousingStockService.outputs.$isExtendedSearchOpen
  );
  const inspectors = useStore(displayInspectorsService.outputs.$inspectorsList);
  const housingManagementList = useStore(
    displayHousingStockFiltersService.outputs.$hosuingManagementList
  );

  const handelExtendedSearchOpen = useEvent(
    searchInspectorsHousingStockService.inputs.extendedSearchOpened
  );
  const handleExtendedSearchClose = useEvent(
    searchInspectorsHousingStockService.inputs.extendedSearchClosed
  );
  const handleStartSearch = useEvent(
    searchInspectorsHousingStockService.forms.searchForm.submit
  );
  const handleClearExtendedSearchValues = useEvent(
    searchInspectorsHousingStockService.inputs.clearExtendedSearch
  );
  const handleApplyFilters = useEvent(
    searchInspectorsHousingStockService.inputs.applyExtendedFilters
  );

  const { InspectorsGate } = displayInspectorsService.inputs;
  const { HousingStockFiltersGate } = displayHousingStockFiltersService.inputs;

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
