import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { ResourceTypeNamesLookup } from './SelectResource.constants';
import { Wrapper } from './SelectResource.styled';
import { SelectResourceProps } from './SelectResource.types';
import { SelectResourcePanel } from './SelectResourcePanel';

export const SelectResource: FC<SelectResourceProps> = ({
  selectedResource,
  setResource,
}) => {
  return (
    <Wrapper>
      {Object.keys(ResourceTypeNamesLookup).map((resourceType) => (
        <SelectResourcePanel
          setResource={setResource}
          resource={resourceType as EResourceType}
          active={selectedResource === resourceType}
        />
      ))}
    </Wrapper>
  );
};
