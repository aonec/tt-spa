import { EResourceType } from 'myApi';

export const ResourceTypeNamesLookup: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'Электричество',
  [EResourceType.Heat]: 'Отопление',
};
