import React, { FC, useMemo } from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ResourceConsumptionGraphDataType } from '../../resourceConsumptionService.types';
import { ResourceConsumptionFilter } from '../ResourceConsumptionFilter';
import { ResourceConsumptionGraph } from '../ResourceConsumptionGraph';
import { SelectResourceConsumptionType } from '../ResourceConsumptionGraph/SelectResourceConsumptionType';
import { SelectResource } from '../SelectResource';
import { GraphWrapper, Wrapper } from './ResourceConsumptionProfile.styled';
import { ResourceConsumptionProfileProps } from './ResourceConsumptionProfile.types';
import { getDisabledGraphTypes } from './ResourceConsumptionProfile.utils';

export const ResourceConsumptionProfile: FC<ResourceConsumptionProfileProps> = ({
  isLoading,
  resourceConsumptionFilter,
  setResource,
  setFilter,
  housingConsumptionData,
  streetsList,
  selectedHouseManagement,
  setHouseManagement,
  houseManagements,
  handleClearData,
  handleClearFilter,
  selectedGraphTypes,
  setSelectedGraphTypes,
  additionalConsumptionData,
  handleClearAdditionalAddress,
}) => {
  const { ResourceType } = resourceConsumptionFilter || {};

  const consumptionData = useMemo(() => {
    if (!housingConsumptionData) {
      return null;
    }
    return {
      ...housingConsumptionData,
      [ResourceConsumptionGraphDataType.additionalAddress]: additionalConsumptionData,
    };
  }, [housingConsumptionData, additionalConsumptionData]);

  return (
    <Wrapper>
      <GraphWrapper>
        <SelectResource
          selectedResource={ResourceType || null}
          setResource={setResource}
        />

        <WithLoader isLoading={isLoading}>
          <ResourceConsumptionGraph
            consumptionData={consumptionData}
            resource={ResourceType}
            startOfMonth={resourceConsumptionFilter?.From || ''}
            checked={selectedGraphTypes}
            additionalConsumptionData={additionalConsumptionData}
          />
          {housingConsumptionData &&
            Boolean(
              housingConsumptionData?.currentMonthData.housing.length
            ) && (
              <SelectResourceConsumptionType
                disabled={getDisabledGraphTypes(housingConsumptionData)}
                checked={selectedGraphTypes}
                setCheckedGraphTypes={setSelectedGraphTypes}
                resource={resourceConsumptionFilter?.ResourceType}
                isAdditionalAddress={Boolean(additionalConsumptionData)}
              />
            )}
        </WithLoader>
      </GraphWrapper>
      <ResourceConsumptionFilter
        setFilter={setFilter}
        filter={resourceConsumptionFilter}
        streetsList={streetsList}
        selectedHouseManagement={selectedHouseManagement}
        setHouseManagement={setHouseManagement}
        houseManagements={houseManagements}
        handleClearData={handleClearData}
        handleClearFilter={handleClearFilter}
        handleClearAdditionalAddress={handleClearAdditionalAddress}
      />
    </Wrapper>
  );
};
