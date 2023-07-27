import React, { FC, useEffect, useMemo, useState } from 'react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ResourceConsumptionGraphDataType } from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraph } from '../ResourceConsumptionGraph';
import { SelectResourceConsumptionType } from '../ResourceConsumptionGraph/SelectResourceConsumptionType';
import { SelectResource } from '../SelectResource';
import { initialSelectedAddresses } from './ResourceConsumptionProfile.constants';
import { GraphWrapper, Wrapper } from './ResourceConsumptionProfile.styled';
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
  additionalConsumptionData,
  summaryConsumption,
  isSummaryLoading,
  resource,
}) => {
  const [selectedAddresses, setSelectedAddresses] = useState<SelectedAddresses>(
    initialSelectedAddresses,
  );

  useEffect(() => {
    setSelectedAddresses(initialSelectedAddresses);
  }, [additionalConsumptionData]);

  const consumptionData = useMemo(() => {
    // if (!housingConsumptionData) {
    //   return null;
    // }
    return {
      ...housingConsumptionData,
      [ResourceConsumptionGraphDataType.additionalAddress]:
        additionalConsumptionData,
    };
  }, [housingConsumptionData, additionalConsumptionData]);


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
            consumptionData={consumptionData}
            resource={resource}
            startOfMonth={resourceConsumptionFilter?.From || ''}
            checked={selectedGraphTypes}
            additionalConsumptionData={additionalConsumptionData}
            selectedAddresses={selectedAddresses}
          />
          {housingConsumptionData &&
            Boolean(
              housingConsumptionData?.currentMonthData?.housing?.length,
            ) && (
              <SelectResourceConsumptionType
                disabled={getDisabledGraphTypes(housingConsumptionData)}
                checked={selectedGraphTypes}
                setCheckedGraphTypes={setSelectedGraphTypes}
                resource={resource}
                isAdditionalAddress={Boolean(additionalConsumptionData)}
                currentAddress={'Основные адреса'}
                additionalAddress={'Адреса для сравнения'}
                selectedAddresses={selectedAddresses}
                setSelectedAddresses={(selected) =>
                  setSelectedAddresses(selected)
                }
              />
            )}
        </WithLoader>
      </GraphWrapper>
      <ResourceConsumptionFilterContainer />
    </Wrapper>
  );
};
