import {
  EActResourceType,
  EResourceType,
  ETaskTargetObjectInfo,
} from 'api/types';
import React, { FC } from 'react';
import {
  AllResourcesIcon,
  CalculatorIcon,
  ColdWaterSupplyIcon,
  ElectricityIcon,
  HeatIcon,
  HotWaterSupplyIcon,
} from 'ui-kit/icons';
import { Icons, ResourceIconLookupProps } from './ResourceIconLookup.types';

export const resourceIconLookup: Icons = {
  [EResourceType.ColdWaterSupply]: ColdWaterSupplyIcon,
  [EResourceType.HotWaterSupply]: HotWaterSupplyIcon,
  [EResourceType.Electricity]: ElectricityIcon,
  [EActResourceType.All]: AllResourcesIcon,
  [ETaskTargetObjectInfo.MultipleResources]: AllResourcesIcon,
  [EActResourceType.Heat]: HeatIcon,
  [ETaskTargetObjectInfo.Calculator]: CalculatorIcon,
};

export const ResourceIconLookup: FC<ResourceIconLookupProps> = ({
  resource,
  style,
}) => {
  const Icon = resourceIconLookup[resource];

  if (!Icon) return null;

  return <Icon style={style} />;
};
