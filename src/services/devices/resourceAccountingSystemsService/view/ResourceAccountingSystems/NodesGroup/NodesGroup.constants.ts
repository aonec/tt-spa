import { EResourceType } from 'api/types';

export const ResourceShortNamesDictionary: {
  [key in EResourceType]: string;
} = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'ЭЭ',
  [EResourceType.Heat]: 'Тепло',
};

export const systemsAmountTexts = [
  {
    digits: [1],
    text: 'система',
  },
  {
    digits: [2, 3, 4],
    text: 'системы',
  },
  {
    digits: [0, 5, 6, 7, 8, 9],
    text: 'систем',
  },
];
