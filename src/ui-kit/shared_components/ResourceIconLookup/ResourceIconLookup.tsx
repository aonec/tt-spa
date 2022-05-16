import React, { FC } from 'react';
import { icons } from './icons';
import { IconTTProps } from './ResourceIconLookup.types';

export const ResourceIconLookup: FC<IconTTProps> = ({ icon, ...props }) => {
  const Icon = icons[icon];

  if (!Icon) return null;

  return <Icon {...props} />;
};
