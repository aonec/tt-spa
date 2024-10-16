import { EActResourceType, ETaskTargetObjectInfo } from 'api/types';

export const actResourceNamesLookup = {
  [EActResourceType.ColdWaterSupply]: 'ХВС',
  [EActResourceType.HotWaterSupply]: 'ГВС',
  [EActResourceType.Electricity]: 'ЭЭ',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
  [ETaskTargetObjectInfo.MultipleResources]: 'Все',
  [ETaskTargetObjectInfo.Calculator]: 'Вычислитель',
};
