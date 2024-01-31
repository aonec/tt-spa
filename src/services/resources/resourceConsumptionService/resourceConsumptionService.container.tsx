import { useUnit } from 'effector-react';
import React, { useEffect, useMemo } from 'react';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ResourceConsumptionProfile } from './view/ResourceConsumptionProfile';
import './resourceConsumptionService.relations';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import {
  AllConsumptionDataWithNullableAdditionalAddress,
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
} from './resourceConsumptionService.types';
import { getIsOnlyHousingDataEmpty } from './resourceConsumptionService.utils';

const { inputs, outputs, gates } = resourceConsumptionService;
const { ResourceConsumptionGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const ResourceConsumptionContainer = () => {
  const {
    setSelectedGraphTypes,
    setResource,
    selectedGraphTypes,
    summaryConsumption,
    housingConsumptionData,
    resource,
    resourceConsumptionFilter,
    isAdditionalAddressSelected,
    isPrevNormativeAndSubscriberLoading,
    isPrevHousingLoading,
    isNormativeAndSubscriberLoading,
    isHousingLoading,
    isSummaryLoading,
    isLoading,
    dynamicMinMax,
    isOnlyHousingDataEmpty,
  } = useUnit({
    setSelectedGraphTypes: inputs.setSelectedGraphTypes,
    setResource: resourceConsumptionFilterService.inputs.setResource,
    selectedGraphTypes: outputs.$selectedGraphTypes,
    summaryConsumption: outputs.$summaryConsumption,
    housingConsumptionData: outputs.$housingConsumptionData,
    resource: resourceConsumptionFilterService.outputs.$selectedResource,
    resourceConsumptionFilter:
      resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
    isAdditionalAddressSelected: outputs.$isAdditionalAddressSelected,
    isPrevNormativeAndSubscriberLoading:
      outputs.$isPrevNormativeAndSubscriberLoading,
    isPrevHousingLoading: outputs.$isPrevHousingLoading,
    isNormativeAndSubscriberLoading: outputs.$isNormativeAndSubscriberLoading,
    isHousingLoading: outputs.$isHousingLoading,
    isSummaryLoading: outputs.$isSummaryLoading,
    isLoading: outputs.$isLoading,
    dynamicMinMax: outputs.$dynamicMinMax,
    isOnlyHousingDataEmpty: outputs.$isOnlyHousingDataEmpty,
  });

  useEffect(() => {
    if ( getIsOnlyHousingDataEmpty(housingConsumptionData)) {
      setSelectedGraphTypes({
        [ResourceConsumptionGraphDataType.currentMonthData]: {
          housing: true,
          normative: true,
          subscriber: true,
        },
        [ResourceConsumptionGraphDataType.prevMonthData]: {
          housing: true,
          normative: true,
          subscriber: true,
        },
        [ResourceConsumptionGraphDataType.additionalAddress]: {
          housing: false,
          normative: false,
          subscriber: false,
        },
      });
    }
  }, [housingConsumptionData, setSelectedGraphTypes]);

  const preparedHousingConsumptionData: AllConsumptionDataWithNullableAdditionalAddress =
    useMemo(() => {
      if (housingConsumptionData?.additionalAddress) {
        return housingConsumptionData as {
          [ResourceConsumptionGraphDataType.currentMonthData]?: MonthConsumptionData;
          [ResourceConsumptionGraphDataType.prevMonthData]?: MonthConsumptionData;
          [ResourceConsumptionGraphDataType.additionalAddress]: MonthConsumptionData;
        };
      } else {
        return { ...housingConsumptionData, additionalAddress: null };
      }
    }, [housingConsumptionData]);

  return (
    <>
      <ExistingCitiesGate />
      <ResourceConsumptionGate />
      <ResourceConsumptionProfile
        resourceConsumptionFilter={resourceConsumptionFilter}
        isLoading={isLoading}
        setResource={setResource}
        housingConsumptionData={preparedHousingConsumptionData}
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
        dynamicMinMax={dynamicMinMax}
        isOnlyHousingDataEmpty={isOnlyHousingDataEmpty}
      />
    </>
  );
};
