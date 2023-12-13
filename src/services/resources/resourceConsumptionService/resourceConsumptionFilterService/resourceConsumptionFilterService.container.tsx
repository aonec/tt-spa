import { useUnit } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceConsumptionService } from '../resourceConsumptionService.model';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService.model';
import { ResourceConsumptionFilter } from './view/ResourceConsumptionFilter';

const { inputs, outputs } = resourceConsumptionFilterService;

export const ResourceConsumptionFilterContainer = () => {
  const {
    hadleClearData,
    handleClearAdditionalAddressData,
    handleClearData,
    handleClearFilter,
    houseManagements,
    isLoading,
    resourceConsumptionFilter,
    selectCity,
    selectedCity,
    selectedHouseManagement,
    setFilter,
    setHouseManagement,
    treeData,
  } = useUnit({
    selectedHouseManagement: outputs.$selectedHouseManagement,
    houseManagements: outputs.$houseManagements,
    treeData: outputs.$treeData,
    selectedCity: outputs.$selectedCity,
    resourceConsumptionFilter: outputs.$resourceConsumptionFilter,
    isLoading: resourceConsumptionService.outputs.$isLoading,
    handleClearFilter: inputs.clearFilter,
    selectCity: inputs.selectCity,
    setHouseManagement: inputs.selectHouseManagememt,
    setFilter: inputs.setFilter,
    handleClearAdditionalAddressData:
      resourceConsumptionService.inputs.clearAdditionalAddressData,
    handleClearData: resourceConsumptionService.inputs.clearData,
    hadleClearData: resourceConsumptionService.inputs.clearSummary,
  });

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
      handleClearSummary={hadleClearData}
    />
  );
};
