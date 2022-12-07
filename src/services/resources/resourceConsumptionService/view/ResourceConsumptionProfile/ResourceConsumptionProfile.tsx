import React, { FC } from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ResourceConsumptionFilter } from '../ResourceConsumptionFilter';
import { ResourceConsumptionGraph } from '../ResourceConsumptionGraph';
import { SelectResource } from '../SelectResource';
import { GraphWrapper, Wrapper } from './ResourceConsumptionProfile.styled';
import { ResourceConsumptionProfileProps } from './ResourceConsumptionProfile.types';

export const ResourceConsumptionProfile: FC<ResourceConsumptionProfileProps> = ({
  isLoading,
  resourceConsumptionFilter,
  setResource,
  setFilter,
  housingConsumptionData,
}) => {
  const { ResourceType } = resourceConsumptionFilter || {};

  return (
    <Wrapper>
      <GraphWrapper>
        <SelectResource
          selectedResource={ResourceType || null}
          setResource={setResource}
        />

        <WithLoader isLoading={isLoading}>
          <ResourceConsumptionGraph
            housingConsumptionData={housingConsumptionData}
            resource={ResourceType}
          />
        </WithLoader>
      </GraphWrapper>
      <ResourceConsumptionFilter
        setFilter={setFilter}
        filter={resourceConsumptionFilter}
      />
    </Wrapper>
  );
};
