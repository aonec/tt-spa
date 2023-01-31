import { EPipeNodeConfig } from 'myApi';

export const configNamesLookup: { [key in EPipeNodeConfig]: string } = {
  [EPipeNodeConfig.ColdWaterSupply]: 'ХВС',
  [EPipeNodeConfig.HeatNoRecharge]: 'Тепло без подпитки',
  [EPipeNodeConfig.HeatWithRecharge]: 'Тепло с подпиткой',
  [EPipeNodeConfig.HotWaterSupplyNoBackflow]: 'ГВС без обратной магистрали',
  [EPipeNodeConfig.HotWaterSupplyWithBackflow]: 'ГВС с обратной магистралью',
};
