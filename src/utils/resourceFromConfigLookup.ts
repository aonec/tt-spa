import { EPipeNodeConfig, EResourceType } from 'api/types';

export const resourceFromConfig: {
  [key in EPipeNodeConfig]: EResourceType;
} = {
  [EPipeNodeConfig.ColdWaterSupply]: EResourceType.ColdWaterSupply,
  [EPipeNodeConfig.HeatNoRecharge]: EResourceType.Heat,
  [EPipeNodeConfig.HeatWithRecharge]: EResourceType.Heat,
  [EPipeNodeConfig.HotWaterSupplyNoBackflow]: EResourceType.HotWaterSupply,
  [EPipeNodeConfig.HotWaterSupplyWithBackflow]: EResourceType.HotWaterSupply,
  [EPipeNodeConfig.HeatNoHousingMeteringDevice]: EResourceType.Heat,
  [EPipeNodeConfig.HotWaterNoDevice]: EResourceType.HotWaterSupply,
  [EPipeNodeConfig.ColdWaterNoDevice]: EResourceType.ColdWaterSupply,
};
