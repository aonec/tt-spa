import React, { FC } from 'react';
import { icons } from './icons';
import { ResourceIconLookupProps } from './ResourceIconLookup.types';

export const ResourceIconLookup: FC<ResourceIconLookupProps> = ({ icon, ...props }) => {
  const Icon = icons[icon];

  if (!Icon) return null;

  return <Icon {...props} />;
};
