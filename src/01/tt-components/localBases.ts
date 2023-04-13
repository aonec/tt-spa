export interface ItemInterface {
  id: number;
  value: number;
  model: string;
  label: string;
}

export type SelectItem = ItemInterface;

export const allResources = [
  {
    value: 'ColdWaterSupply',
    label: 'ХВС',
  },
  {
    value: 'HotWaterSupply',
    label: 'ГВС',
  },
  {
    value: 'Heat',
    label: 'Тепло',
  },
  {
    value: 'Electricity',
    label: 'Электроэнергия',
  },
];
