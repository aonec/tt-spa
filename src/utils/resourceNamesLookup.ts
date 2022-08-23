import { EResourceType } from 'myApi';

export const resourceNamesLookup: { [key: string]: string } = {
  [EResourceType.ColdWaterSupply]: 'Холодная вода',
  [EResourceType.HotWaterSupply]: 'Горячая вода',
  [EResourceType.Electricity]: 'Электричество',
  [EResourceType.Heat]: 'Отопление',
};
