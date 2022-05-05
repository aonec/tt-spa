import { IconTT } from '01/shared/ui/IconTT';
import React, { FC } from 'react';
import { Name, Wrap } from './ResourceInfo.styled';
import { ResourceInfoProps } from './ResourceInfo.types';
import { actResourceTypeNames } from './ResourceInfo.utils';

export const ResourceInfo: FC<ResourceInfoProps> = ({ resource }) => {
  return (
    <Wrap>
      <IconTT icon={resource} />
      <Name>{actResourceTypeNames[resource]}</Name>
    </Wrap>
  );
};
