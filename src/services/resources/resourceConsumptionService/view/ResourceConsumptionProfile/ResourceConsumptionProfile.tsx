import React, { FC } from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
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
  selectedGraphTypes,
  setSelectedGraphTypes,
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
            consumptionData={housingConsumptionData}
            resource={ResourceType}
            startOfMonth={resourceConsumptionFilter?.From || ''}
            checked={selectedGraphTypes}
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
      />
    </Wrapper>
  );
};
