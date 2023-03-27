import { EPipeNodeConfig } from 'myApi';

export const configNamesLookup: { [key in EPipeNodeConfig]: string } = {
  [EPipeNodeConfig.ColdWaterSupply]: 'УХВС',
  [EPipeNodeConfig.HeatNoRecharge]: 'УУТЭ без подпитки',
  [EPipeNodeConfig.HeatWithRecharge]: 'УУТЭ с подпиткой',
  [EPipeNodeConfig.HotWaterSupplyNoBackflow]: 'УГВС без обратной магистрали',
  [EPipeNodeConfig.HotWaterSupplyWithBackflow]: 'УГВС с обратной магистралью',
  [EPipeNodeConfig.HeatNoHousingMeteringDevice]: 'УУТЭ без ОДПУ',
};
