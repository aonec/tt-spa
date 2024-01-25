import { useUnit } from 'effector-react';
import React from 'react';
import { uniqueWorkingRangeService } from './uniqueWorkingRangeService.model';
import { UniqueWorkingRange } from './view/UniqueWorkingRange/UniqueWorkingRange';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs } = uniqueWorkingRangeService;
const { ExistingCitiesGate } = addressSearchService.gates;

export const UniqueWorkingRangeContainer = () => {
  const {
    addressesPagedList,
    existingCities,
    handleFetchNodes,
    handleNodeChoosen,
    handleOnSearchDataChange,
    housingStockUniqueWorkingRange,
    isLoading,
    nodes,
    selectedCity,
    setSelectedCity,
  } = useUnit({
    housingStockUniqueWorkingRange: outputs.$housingStockUniqueWorkingRange,
    isLoading: outputs.$isLoading,
    addressesPagedList: outputs.$addressesPagedList,
    existingCities: outputs.$existingCities,
    selectedCity: outputs.$selectedCity,
    nodes: outputs.$nodes,
    handleOnSearchDataChange: inputs.handleOnSearchDataChange,
    handleNodeChoosen: inputs.handleNodeChoosen,
    setSelectedCity: inputs.setSelectedCity,
    handleFetchNodes: inputs.handleFetchNodes,
  });

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
    isTreeCheckable: false,
  });

  return (
    <>
      <ExistingCitiesGate />
      <UniqueWorkingRange
        housingStockUniqueWorkingRange={housingStockUniqueWorkingRange}
        isLoading={isLoading}
        handleOnSearchDataChange={handleOnSearchDataChange}
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        preparedAddresses={preparedAddresses}
        existingCities={existingCities}
        handleFetchNodes={handleFetchNodes}
        nodes={nodes}
        handleNodeChoosen={handleNodeChoosen}
      />
    </>
  );
};
