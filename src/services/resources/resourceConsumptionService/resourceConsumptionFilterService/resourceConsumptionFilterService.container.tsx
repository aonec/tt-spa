import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceConsumptionService } from '../resourceConsumptionService.model';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService.model';
import { ResourceConsumptionFilter } from './view/ResourceConsumptionFilter';

const { inputs, outputs } = resourceConsumptionFilterService;

export const ResourceConsumptionFilterContainer = () => {
  const selectedHouseManagement = useStore(outputs.$selectedHouseManagement);
  const houseManagements = useStore(outputs.$houseManagements);
  const treeData = useStore(outputs.$treeData);
  const selectedCity = useStore(outputs.$selectedCity);
  const resourceConsumptionFilter = useStore(
    outputs.$resourceConsumptionFilter,
  );
  const isLoading = useStore(resourceConsumptionService.outputs.$isLoading);

  const handleClearFilter = useEvent(inputs.clearFilter);
  const selectCity = useEvent(inputs.selectCity);
  const setHouseManagement = useEvent(inputs.selectHouseManagememt);
  const setFilter = useEvent(inputs.setFilter);
  const handleClearAdditionalAddressData = useEvent(
    resourceConsumptionService.inputs.clearAdditionalAddressData,
  );
  const handleClearData = useEvent(resourceConsumptionService.inputs.clearData);

  const preparedHouseManagements = useMemo(
    () =>
      houseManagements.map((houseManagement) => ({
        id: houseManagement.id,
        name: houseManagement.name,
      })),
    [houseManagements],
  );

  return (
    <ResourceConsumptionFilter
      setFilter={setFilter}
      filter={resourceConsumptionFilter}
      selectedHouseManagement={selectedHouseManagement}
      setHouseManagement={setHouseManagement}
      houseManagements={preparedHouseManagements}
      treeData={treeData}
      selectedCity={selectedCity}
      selectCity={selectCity}
      handleClearFilter={handleClearFilter}
      handleClearAdditionalAddressData={handleClearAdditionalAddressData}
      handleClearData={handleClearData}
      isLoading={isLoading}
    />
  );
};
