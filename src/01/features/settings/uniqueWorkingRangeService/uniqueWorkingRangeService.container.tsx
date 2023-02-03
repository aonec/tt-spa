import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { uniqueWorkingRangeService } from './uniqueWorkingRangeService.model';
import { UniqueWorkingRange } from './view/UniqueWorkingRange/UniqueWorkingRange';
import { prepareAddressesForTreeSelect } from 'services/resources/createResourceDisconnectionService/createResourceDisconnectionService.utils';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';

const { inputs, outputs } = uniqueWorkingRangeService;

export const UniqueWorkingRangeContainer = () => {
  const housingStockUniqueWorkingRange = useStore(
    outputs.$housingStockUniqueWorkingRange
  );
  const isLoading = useStore(outputs.$isLoading);
  const addressesPagedList = useStore(outputs.$addressesPagedList);
  const existingCities = useStore(outputs.$existingCities);
  const selectedCity = useStore(outputs.$selectedCity);
  const nodes = useStore(outputs.$nodes);

  const handleOnSearchDataChange = useEvent(inputs.handleOnSearchDataChange);
  const handleNodeChoosen = useEvent(inputs.handleNodeChoosen);
  const setSelectedCity = useEvent(inputs.setSelectedCity);
  const handleFetchNodes = useEvent(inputs.handleFetchNodes);

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
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