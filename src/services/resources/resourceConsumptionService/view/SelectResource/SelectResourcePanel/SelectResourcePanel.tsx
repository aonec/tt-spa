import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceTypeNamesLookup } from '../SelectResource.constants';
import { ContentWrapper, Wrapper } from './SelectResourcePanel.styled';
import { SelectResourcePanelProps } from './SelectResourcePanel.types';

export const SelectResourcePanel: FC<SelectResourcePanelProps> = ({
  resource,
  active,
  setResource,
}) => {
  return (
    <Wrapper active={active} onClick={() => setResource(resource)}>
      <ContentWrapper>
        <ResourceIconLookup resource={resource} />
        <div>{ResourceTypeNamesLookup[resource]}</div>
      </ContentWrapper>
    </Wrapper>
  );
};
