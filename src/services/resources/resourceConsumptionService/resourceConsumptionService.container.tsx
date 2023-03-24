import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ResourceConsumptionProfile } from './view/ResourceConsumptionProfile';
import './resourceConsumptionService.relations';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService';

const { inputs, outputs, gates } = resourceConsumptionService;
const { ResourceConsumptionGate } = gates;

export const ResourceConsumptionContainer = () => {
  const isLoading = useStore(outputs.$isLoading);

  const resourceConsumptionFilter = useStore(
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  );
  const housingConsumptionData = useStore(outputs.$housingConsumptionData);
  const summaryConsumption = useStore(outputs.$summaryConsumption);
  const selectedGraphTypes = useStore(outputs.$selectedGraphTypes);
  const additionalConsumptionData = useStore(outputs.$additionalConsumption);

  const setResource = useEvent(
    resourceConsumptionFilterService.inputs.setResource,
  );
  const setSelectedGraphTypes = useEvent(inputs.setSelectedGraphTypes);

  return (
    <>
      <ExistingCitiesGate />
      <ResourceConsumptionGate />
      <ResourceConsumptionProfile
        resourceConsumptionFilter={resourceConsumptionFilter}
        isLoading={isLoading}
        setResource={setResource}
        housingConsumptionData={housingConsumptionData}
        selectedGraphTypes={selectedGraphTypes}
        setSelectedGraphTypes={setSelectedGraphTypes}
        additionalConsumptionData={additionalConsumptionData}
        summaryConsumption={summaryConsumption}
      />
    </>
  );
};
