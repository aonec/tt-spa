import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ResourceConsumptionProfile } from './view/ResourceConsumptionProfile';

const { inputs, outputs, gates } = resourceConsumptionService;
const { ResourceConsumptionGate } = gates;

export const ResourceConsumptionContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const resourceConsumptionFilter = useStore(
    outputs.$resourceConsumptionFilter
  );
  const housingConsumptionData = useStore(outputs.$housingConsumptionData);

  const setResource = useEvent(inputs.setResource);
  const setFilter = useEvent(inputs.setFilter);

  return (
    <>
      <ResourceConsumptionGate />
      <ResourceConsumptionProfile
        isLoading={isLoading}
        resourceConsumptionFilter={resourceConsumptionFilter}
        setResource={setResource}
        setFilter={setFilter}
      />
    </>
  );
};
