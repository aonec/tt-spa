import { EActResourceType } from 'myApi';

export const actResourceTypeNames = {
  [EActResourceType.ColdWaterSupply]: 'ХВС',
  [EActResourceType.HotWaterSupply]: 'ГВС',
  [EActResourceType.Electricity]: 'ЭЭ',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
};
