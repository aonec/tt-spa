import { EActResourceType, EResourceType } from '../../../api/types';
import { FC } from 'react';
import {
  AllResourcesIcon,
  ColdWaterSupplyIcon,
  ElectricityIcon,
  HeatIcon,
  HotWaterSupplyIcon,
} from '../../../ui-kit/icons';
import { Icons, ResourceIconLookupProps } from './ResourceIconLookup.types';

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
