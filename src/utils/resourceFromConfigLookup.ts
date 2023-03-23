import { EPipeNodeConfig, EResourceType } from 'myApi';

export const resourceFromConfig: {
  [key in EPipeNodeConfig]: EResourceType;
} = {
  [EPipeNodeConfig.ColdWaterSupply]: EResourceType.ColdWaterSupply,
  [EPipeNodeConfig.HeatNoRecharge]: EResourceType.Heat,
  [EPipeNodeConfig.HeatWithRecharge]: EResourceType.Heat,
  [EPipeNodeConfig.HotWaterSupplyNoBackflow]: EResourceType.HotWaterSupply,
  [EPipeNodeConfig.HotWaterSupplyWithBackflow]: EResourceType.HotWaterSupply,
  [EPipeNodeConfig.HeatNoHousingMeteringDevice]: EResourceType.HotWaterSupply,
};
