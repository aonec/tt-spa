import { FC } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
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
