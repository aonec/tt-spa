import React, { useUnit } from 'effector-react';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStock.models';
import { SearchInspectorsHousingStocks } from './views/SearchInspectorsHousingStocks/SearchInspectorsHousingStocks';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { displayHousingStockFiltersService } from '../displayHosuingStockFiltersService/displayHosuingStockFiltersService.models';
import { getInspectorsHousingStocksQuery } from '../displayInspectorsHousingStocksService/displayInspectorsHousingStocksService.api';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService/displayInspectorsHousingStocksService.models';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { currentOrganizationService } from 'services/currentOrganizationService';
import _ from 'lodash';

const { InspectorsGate } = displayInspectorsService.inputs;
const { HousingStockFiltersGate } = displayHousingStockFiltersService.inputs;

const { inputs, outputs } = searchInspectorsHousingStockService;

export const SearchInspectorsHousingStocksContainer = () => {
  const {
    handelExtendedSearchOpen,
    handleApplyFilters,
    handleClearExtendedSearchValues,
    handleExtendedSearchClose,
    housingManagementList,
    inspectors,
    isExtendedSearchOpen,
    isInspectorsFetched,
    housingStocks,
    defaultCity,
    existingCities,
    handleSearchInspector,
    setForm,
  } = useUnit({
    isExtendedSearchOpen: outputs.$isExtendedSearchOpen,
    inspectors: displayInspectorsService.outputs.$inspectorsList,
    housingManagementList:
      displayHousingStockFiltersService.outputs.$hosuingManagementList,
    handelExtendedSearchOpen: inputs.extendedSearchOpened,
    handleExtendedSearchClose: inputs.extendedSearchClosed,
    handleClearExtendedSearchValues: inputs.clearExtendedSearch,
    handleApplyFilters: inputs.applyExtendedFilters,
    isInspectorsFetched: getInspectorsHousingStocksQuery.$succeeded,
    housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
    defaultCity: currentOrganizationService.outputs.$defaultCity,
    existingCities: addressSearchService.outputs.$existingCities,
    handleSearchInspector: inputs.handleSearchInspector,
    setForm: inputs.setForm,
  });

  const initialCity = defaultCity || _.last(existingCities) || '';

  return (
    <>
      <InspectorsGate />
      <HousingStockFiltersGate />
      <SearchInspectorsHousingStocks
        handleApplyFilters={() => handleApplyFilters()}
        handelExtendedSearchOpen={() => handelExtendedSearchOpen()}
        handleExtendedSearchClose={() => handleExtendedSearchClose()}
        handleClearExtendedSearchValues={() =>
          handleClearExtendedSearchValues()
        }
        isExtendedSearchOpen={isExtendedSearchOpen}
        inspectors={inspectors}
        hosuingManagements={housingManagementList}
        isSearchError={isInspectorsFetched && !housingStocks?.length}
        initialCity={initialCity}
        handleSearchInspector={handleSearchInspector}
        setForm={setForm}
      />
    </>
  );
};
