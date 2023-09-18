import { EResourceType } from 'api/types';
import React, { FC } from 'react';
import { ResourceTypeNamesLookup } from './SelectResource.constants';
import { Wrapper } from './SelectResource.styled';
import { SelectResourceProps } from './SelectResource.types';
import { SelectResourcePanel } from './SelectResourcePanel';

export const SelectResource: FC<SelectResourceProps> = ({
  selectedResource,
  setResource,
  summaryConsumption,
  isSummaryLoading,
}) => {
  return (
    <Wrapper>
      {Object.keys(ResourceTypeNamesLookup).map((resourceType) => {
        const summary =
          (summaryConsumption?.consumptions || []).find(
            (consumption) => consumption.key === resourceType,
          )?.value || null;

        return (
          <SelectResourcePanel
            setResource={setResource}
            resource={resourceType as EResourceType}
            active={selectedResource === resourceType}
            key={resourceType}
            summary={summary}
            isSummaryLoading={isSummaryLoading}
          />
        );
      })}
    </Wrapper>
  );
};
