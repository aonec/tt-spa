import { EResourceType } from 'api/types';

export const resourceNamesLookup: { [key: string]: string } = {
  [EResourceType.ColdWaterSupply]: 'Холодная вода',
  [EResourceType.HotWaterSupply]: 'Горячая вода',
  [EResourceType.Electricity]: 'Электричество',
  [EResourceType.Heat]: 'Отопление',
};
