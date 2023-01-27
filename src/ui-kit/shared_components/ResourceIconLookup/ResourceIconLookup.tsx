import { EActResourceType, EPipeNodeConfig, EResourceType } from 'myApi';
import React, { FC } from 'react';
import {
  AllResourcesIcon,
  ColdWaterSupplyIcon,
  ElectricityIcon,
  HeatIcon,
  HotWaterSupplyIcon,
} from 'ui-kit/icons';
import {
  Icons,
  PipeNodeConfigIconLookupProps,
  ResourceIconLookupProps,
} from './ResourceIconLookup.types';

export const resourceIconLookup: Icons = {
  [EResourceType.ColdWaterSupply]: ColdWaterSupplyIcon,
  [EResourceType.HotWaterSupply]: HotWaterSupplyIcon,
  [EResourceType.Electricity]: ElectricityIcon,
  [EActResourceType.All]: AllResourcesIcon,
  [EActResourceType.Heat]: HeatIcon,
};

export const ResourceIconLookup: FC<ResourceIconLookupProps> = ({
  resource,
  style,
}) => {
  const Icon = resourceIconLookup[resource];

  if (!Icon) return null;

  return <Icon style={style} />;
};

export const pipeNodeConfigIconLookup: Icons = {
  [EPipeNodeConfig.ColdWaterSupply]: ColdWaterSupplyIcon,
  [EPipeNodeConfig.HotWaterSupplyNoBackflow]: HotWaterSupplyIcon,
  [EResourceType.Electricity]: ElectricityIcon,
  [EActResourceType.All]: AllResourcesIcon,
  [EActResourceType.Heat]: HeatIcon,
};

export const PipeNodeConfigIconLookup: FC<PipeNodeConfigIconLookupProps> = ({
  config,
  style,
}) => {
  const Icon = resourceIconLookup[config];

  if (!Icon) return null;

  return <Icon style={style} />;
};
