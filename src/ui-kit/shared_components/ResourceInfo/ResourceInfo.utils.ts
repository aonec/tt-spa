import { EActResourceType } from 'api/myApi';

export const actResourceNamesLookup = {
  [EActResourceType.ColdWaterSupply]: 'ХВС',
  [EActResourceType.HotWaterSupply]: 'ГВС',
  [EActResourceType.Electricity]: 'ЭЭ',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
};
