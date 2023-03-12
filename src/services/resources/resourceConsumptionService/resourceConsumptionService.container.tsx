import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ResourceConsumptionProfile } from './view/ResourceConsumptionProfile';

const { inputs, outputs, gates } = resourceConsumptionService;
const { ResourceConsumptionGate } = gates;

export const ResourceConsumptionContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const resourceConsumptionFilter = useStore(
    outputs.$resourceConsumptionFilter,
  );
  const housingConsumptionData = useStore(outputs.$housingConsumptionData);
  const selectedHouseManagement = useStore(outputs.$selectedHouseManagement);
  const streetsListInHouseManagement = useStore(outputs.$addressesList);
  const houseManagements = useStore(outputs.$houseManagements);
  const selectedGraphTypes = useStore(outputs.$selectedGraphTypes);
  const additionalConsumptionData = useStore(outputs.$additionalConsumption);
  const treeData = useStore(outputs.$treeData);
  const selectedCity = useStore(outputs.$selectedCity);

  const setResource = useEvent(inputs.setResource);
  const setFilter = useEvent(inputs.setFilter);
  const setHouseManagement = useEvent(inputs.selectHouseManagememt);
  const handleClearData = useEvent(inputs.clearData);
  const handleClearFilter = useEvent(inputs.clearStore);
  const setSelectedGraphTypes = useEvent(inputs.setSelectedGraphTypes);
  const handleClearAdditionalAddressData = useEvent(
    inputs.clearAdditionalAddressData,
  );
  const selectCity = useEvent(inputs.selectCity);

  const preparedHouseManagements = useMemo(
    () =>
      houseManagements.map((houseManagement) => ({
        id: houseManagement.id,
        name: houseManagement.name,
      })),
    [houseManagements],
  );

  return (
    <>
      <ExistingCitiesGate />
      <ResourceConsumptionGate />
      <ResourceConsumptionProfile
        isLoading={isLoading}
        resourceConsumptionFilter={resourceConsumptionFilter}
        setResource={setResource}
        setFilter={setFilter}
        housingConsumptionData={housingConsumptionData}
        streetsList={streetsListInHouseManagement}
        selectedHouseManagement={selectedHouseManagement}
        setHouseManagement={setHouseManagement}
        houseManagements={preparedHouseManagements}
        handleClearData={() => handleClearData()}
        handleClearFilter={() => handleClearFilter()}
        selectedGraphTypes={selectedGraphTypes}
        setSelectedGraphTypes={setSelectedGraphTypes}
        additionalConsumptionData={additionalConsumptionData}
        handleClearAdditionalAddressData={() =>
          handleClearAdditionalAddressData()
        }
        treeData={treeData}
        selectedCity={selectedCity}
        selectCity={selectCity}
      />
    </>
  );
};
