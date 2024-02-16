import React, { FC, useEffect, useState } from 'react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ResourceConsumptionGraph } from '../ResourceConsumptionGraph';
import { SelectResourceConsumptionType } from '../ResourceConsumptionGraph/SelectResourceConsumptionType';
import { SelectResource } from '../SelectResource';
import { initialSelectedAddresses } from './ResourceConsumptionProfile.constants';
import {
  GraphWrapper,
  HousingDataEmptyAlert,
  Wrapper,
} from './ResourceConsumptionProfile.styled';
import {
  ResourceConsumptionProfileProps,
  SelectedAddresses,
} from './ResourceConsumptionProfile.types';
import { getDisabledGraphTypes } from './ResourceConsumptionProfile.utils';
import { ResourceConsumptionFilterContainer } from '../../resourceConsumptionFilterService';

export const ResourceConsumptionProfile: FC<
  ResourceConsumptionProfileProps
> = ({
  isLoading,
  resourceConsumptionFilter,
  setResource,
  housingConsumptionData,
  selectedGraphTypes,
  setSelectedGraphTypes,
  summaryConsumption,
  isSummaryLoading,
  resource,
  resourceForColor,
  isHousingLoading,
  isNormativeAndSubscriberLoading,
  isPrevHousingLoading,
  isPrevNormativeAndSubscriberLoading,
  isAdditionalAddressSelected,
  dynamicMinMax,
  isOnlyHousingDataEmpty,
  isAllDataLoading,
  isDataLoading,
}) => {
  const [selectedAddresses, setSelectedAddresses] = useState<SelectedAddresses>(
    initialSelectedAddresses,
  );
  useEffect(() => {
    setSelectedAddresses(initialSelectedAddresses);
  }, [housingConsumptionData?.additionalAddress]);

  return (
    <Wrapper>
      <GraphWrapper>
        <SelectResource
          selectedResource={resource}
          setResource={setResource}
          summaryConsumption={summaryConsumption}
          isSummaryLoading={isSummaryLoading}
        />

        <WithLoader isLoading={isLoading}>
          <ResourceConsumptionGraph
            consumptionData={housingConsumptionData}
            resource={resource}
            resourceForColor={resourceForColor}
            startOfMonth={resourceConsumptionFilter?.From || ''}
            checked={selectedGraphTypes}
            selectedAddresses={selectedAddresses}
            isAdditionalAddressSelected={isAdditionalAddressSelected}
            dynamicMinMax={dynamicMinMax}
            isAllDataLoading={isAllDataLoading}
            isDataLoading={isDataLoading}
          />

          {isOnlyHousingDataEmpty && (
            <HousingDataEmptyAlert>
              Нет данных по общедомовому потреблению за выбранный период.
              Пожалуйста, измените период для формирования новой статистики.
            </HousingDataEmptyAlert>
          )}

          <SelectResourceConsumptionType
            disabled={getDisabledGraphTypes(housingConsumptionData)}
            checked={selectedGraphTypes}
            setCheckedGraphTypes={setSelectedGraphTypes}
            resource={resource}
            isAdditionalAddress={isAdditionalAddressSelected}
            currentAddress={'Основные адреса'}
            additionalAddress={'Адреса для сравнения'}
            selectedAddresses={selectedAddresses}
            setSelectedAddresses={(selected) => setSelectedAddresses(selected)}
            isHousingLoading={isHousingLoading}
            isNormativeAndSubscriberLoading={isNormativeAndSubscriberLoading}
            isPrevHousingLoading={isPrevHousingLoading}
            isPrevNormativeAndSubscriberLoading={
              isPrevNormativeAndSubscriberLoading
            }
            consumptionData={housingConsumptionData}
          />
        </WithLoader>
      </GraphWrapper>
      <ResourceConsumptionFilterContainer />
    </Wrapper>
  );
};
