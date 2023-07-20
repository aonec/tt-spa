import { EResourceType } from 'api/myApi';
export const NO_CALCULATOR_KEY = 'NO_CALCULATOR';

export const ResourcesPriorityDictionary: { [key in EResourceType]: number } = {
  [EResourceType.ColdWaterSupply]: 1,
  [EResourceType.HotWaterSupply]: 2,
  [EResourceType.Heat]: 3,
  [EResourceType.Electricity]: 4,
};
