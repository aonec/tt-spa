import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ResourceConsumptionProfile } from './view/ResourceConsumptionProfile';
import './resourceConsumptionService.relations';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = resourceConsumptionService;
const { ResourceConsumptionGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const ResourceConsumptionContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const isSummaryLoading = useStore(outputs.$isSummaryLoading);
  const isHousingLoading = useStore(outputs.$isHousingLoading);
  const isNormativeAndSubscriberLoading = useStore(
    outputs.$isNormativeAndSubscriberLoading,
  );
  const isPrevHousingLoading = useStore(outputs.$isPrevHousingLoading);
  const isPrevNormativeAndSubscriberLoading = useStore(
    outputs.$isPrevNormativeAndSubscriberLoading,
  );
  const isAdditionalAddressSelected = useStore(
    outputs.$isAdditionalAddressSelected,
  );

  const resourceConsumptionFilter = useStore(
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  );
  const resource = useStore(
    resourceConsumptionFilterService.outputs.$selectedResource,
  );
  const housingConsumptionData = useStore(outputs.$housingConsumptionData);
  const summaryConsumption = useStore(outputs.$summaryConsumption);
  const selectedGraphTypes = useStore(outputs.$selectedGraphTypes);

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
        summaryConsumption={summaryConsumption}
        isSummaryLoading={isSummaryLoading}
        resource={resource}
        isPrevNormativeAndSubscriberLoading={
          isPrevNormativeAndSubscriberLoading
        }
        isPrevHousingLoading={isPrevHousingLoading}
        isNormativeAndSubscriberLoading={isNormativeAndSubscriberLoading}
        isHousingLoading={isHousingLoading}
        isAdditionalAddressSelected={isAdditionalAddressSelected}
      />
    </>
  );
};
