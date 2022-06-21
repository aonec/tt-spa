import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Name, Wrap } from './ResourceInfo.styled';
import { ResourceInfoProps } from './ResourceInfo.types';
import { actResourceNamesLookup } from './ResourceInfo.utils';

export const ResourceInfo: FC<ResourceInfoProps> = ({ resource }) => {
  return (
    <Wrap>
      <ResourceIconLookup resource={resource} />
      <Name>{actResourceNamesLookup[resource]}</Name>
    </Wrap>
  );
};
