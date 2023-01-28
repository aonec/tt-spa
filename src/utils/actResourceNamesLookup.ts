import { EActResourceType } from "myApi";

export const actResourceNamesLookup: { [key: string]: string } = {
  [EActResourceType.ColdWaterSupply]: 'Холодная вода',
  [EActResourceType.HotWaterSupply]: 'Горячая вода',
  [EActResourceType.Electricity]: 'Электричество',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
};
