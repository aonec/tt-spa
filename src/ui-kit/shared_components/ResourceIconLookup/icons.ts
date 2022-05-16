import { EActResourceType, EResourceType } from 'myApi';
import {
  AllIcon,
  ColdWaterSupplyIcon,
  ElectricityIcon,
  HeatIcon,
  HotWaterSupplyIcon,
} from './assets';
import { Icons } from './ResourceIconLookup.types';

export const icons: Icons = {
  [EResourceType.ColdWaterSupply]: ColdWaterSupplyIcon,
  [EResourceType.HotWaterSupply]: HotWaterSupplyIcon,
  [EResourceType.Electricity]: ElectricityIcon,
  [EActResourceType.All]: AllIcon,
  [EActResourceType.Heat]: HeatIcon,
};
