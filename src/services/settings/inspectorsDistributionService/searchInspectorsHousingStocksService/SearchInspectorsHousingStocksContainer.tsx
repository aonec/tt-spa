import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import React from 'react';
import { searchInspectorsHousingStockService } from './searchInspectorsHousingStockService.models';
import { SearchInspectorsHousingStocks } from './views/SearchInspectorsHousingStocks';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { displayHousingStockFiltersService } from '../displayHosuingStockFiltersService/displayHosuingStockFiltersService.models';
import { getInspectorsHousingStocksQuery } from '../displayInspectorsHousingStocksService/displayInspectorsHousingStocksService.api';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService/displayInspectorsHousingStocksService.models';

const { InspectorsGate } = displayInspectorsService.inputs;
const { HousingStockFiltersGate } = displayHousingStockFiltersService.inputs;

export const SearchInspectorsHousingStocksContainer = () => {
  const form = useForm(searchInspectorsHousingStockService.forms.searchForm);

  const {
    handelExtendedSearchOpen,
    handleApplyFilters,
    handleClearExtendedSearchValues,
    handleExtendedSearchClose,
    handleStartSearch,
    housingManagementList,
    inspectors,
    isExtendedSearchOpen,
    isInspectorsFetched,
    housingStocks,
  } = useUnit({
    isExtendedSearchOpen:
      searchInspectorsHousingStockService.outputs.$isExtendedSearchOpen,
    inspectors: displayInspectorsService.outputs.$inspectorsList,
    housingManagementList:
      displayHousingStockFiltersService.outputs.$hosuingManagementList,
    handelExtendedSearchOpen:
      searchInspectorsHousingStockService.inputs.extendedSearchOpened,
    handleExtendedSearchClose:
      searchInspectorsHousingStockService.inputs.extendedSearchClosed,
    handleStartSearch:
      searchInspectorsHousingStockService.forms.searchForm.submit,
    handleClearExtendedSearchValues:
      searchInspectorsHousingStockService.inputs.clearExtendedSearch,
    handleApplyFilters:
      searchInspectorsHousingStockService.inputs.applyExtendedFilters,
    isInspectorsFetched: getInspectorsHousingStocksQuery.$succeeded,
    housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
  });

  return (
    <>
      <InspectorsGate />
      <HousingStockFiltersGate />
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
        inspectors={inspectors}
        hosuingManagements={housingManagementList}
        isSearchError={isInspectorsFetched && !housingStocks?.length}
      />
    </>
  );
};
